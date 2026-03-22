import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { getProjectTemplate } from "@/lib/project-templates";

// --- Types ---
export type ProjectType = 'cpp' | 'csharp' | 'html' | 'react' | 'python' | 'java';

export type Project = {
  id: string;
  name: string;
  created_at: string;
  room_id: string;
  owner_id: string;
  owner_username: string | null;
  owner_avatar_url: string | null;
  commit_count: number;
  last_edited_at: string | null;
  project_type: ProjectType;
  default_permission: 'editor' | 'viewer';
  is_owner?: boolean;
  user_permission?: 'editor' | 'viewer';
};

// --- Fetch Functions ---

const fetchAllProjects = async (): Promise<Project[]> => {
  // Use optimized function that fetches all project data in one query
  const { data, error } = await supabase.rpc("get_user_projects_optimized");

  if (error) {
    console.error("Error fetching all projects:", error);
    throw new Error("Failed to load projects.");
  }
  return (data as Project[]) || [];
};

const fetchUserPublicRepos = async (userId: string): Promise<Project[]> => {
  const { data, error } = await supabase.rpc('get_user_public_repos', { p_user_id: userId });
  if (error) throw error;
  return (data as Project[]) || [];
};

// --- Hooks ---

export const useProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: fetchAllProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useRecentProjects = (limit: number = 3) => {
  // Use the same query key as useProjects to avoid duplicate fetching
  // React Query will share the cached data and just select the first few items
  return useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: fetchAllProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => data.slice(0, limit),
  });
};

export const useUserPublicRepos = (userId: string | undefined) => {
  return useQuery<Project[], Error>({
    queryKey: ["userPublicRepos", userId],
    queryFn: () => fetchUserPublicRepos(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProjectByRoomId = (roomId: string | undefined) => {
  return useQuery<Project, Error>({
    queryKey: ["project-room", roomId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          owner:profiles!projects_owner_id_fkey(username, avatar_url)
        `)
        .eq("room_id", roomId)
        .single();

      if (error) throw error;
      const projectData = data as any;
      return {
        ...projectData,
        owner_username: projectData.owner?.username,
        owner_avatar_url: projectData.owner?.avatar_url
      } as Project;
    },
    enabled: !!roomId,
    staleTime: 1000 * 60 * 5,
  });
};

// --- Mutation Hooks ---

interface CreateProjectResult {
  new_project_id: string;
  new_room_id: string;
}

interface CreateProjectPayload {
  projectName: string;
  projectType: ProjectType;
  defaultPermission: 'editor' | 'viewer';
  inviteeIds?: string[];
  initialFiles?: { path: string; content: string }[];
}

const createProject = async ({ projectName, projectType, defaultPermission, inviteeIds, initialFiles }: CreateProjectPayload): Promise<CreateProjectResult> => {
  const { data, error } = await supabase.rpc("create_new_project", {
    project_name: projectName,
    p_default_permission: defaultPermission,
    p_invitee_ids: inviteeIds || [],
    p_project_type: projectType,
  });

  if (error) {
    console.error("Supabase RPC Error:", error);
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Could not create project. Received no data from RPC.");
  }

  const result = data[0] as CreateProjectResult;

  if (initialFiles && initialFiles.length > 0) {
    // If we have initial files, we need to delete the default file created by RPC first
    // because we will insert our own file structure.
    await supabase.from("files").delete().eq("room_id", result.new_room_id);

    const filesToInsert = initialFiles.map(file => ({
      room_id: result.new_room_id,
      path: file.path,
      content: file.content
    }));

    const { error: insertError } = await supabase.from("files").insert(filesToInsert);
    if (insertError) {
      console.error("Error inserting initial files:", insertError);
      throw new Error("Failed to upload project files.");
    }
  } else {
    // Populate the initial file with template content (standard behavior)
    const template = getProjectTemplate(projectType);
    
    const { error: updateError } = await supabase
      .from("files")
      .update({ content: template.content })
      .eq("room_id", result.new_room_id)
      .eq("path", template.filename);

    if (updateError) {
      // Fallback: try to update any file if specific filename update fails
      const { data: existingFiles } = await supabase
        .from("files")
        .select("path")
        .eq("room_id", result.new_room_id)
        .limit(1);
      
      if (existingFiles && existingFiles.length > 0) {
        await supabase
          .from("files")
          .update({ content: template.content })
          .eq("room_id", result.new_room_id)
          .eq("path", existingFiles[0].path);
      }
    }
  }

  return result;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateProjectResult, Error, CreateProjectPayload>({
    mutationFn: createProject,
    onSuccess: (_, variables) => {
      toast.success("Project created successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      // Also invalidate profile to update project count
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
  });
};

const renameProject = async ({
  projectId,
  name,
}: {
  projectId: string;
  name: string;
}): Promise<void> => {
  const { error } = await supabase
    .from("projects")
    .update({ name })
    .eq("id", projectId);

  if (error) {
    console.error("Error renaming project:", error);
    throw new Error(error.message || "Failed to rename project.");
  }
};

export const useRenameProject = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { projectId: string; name: string }>({
    mutationFn: renameProject,
    onSuccess: () => {
      toast.success("Project renamed successfully.");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error(`Failed to rename project: ${error.message}`);
    },
  });
};

const deleteProject = async (projectId: string): Promise<void> => {
  const { error } = await supabase.from("projects").delete().eq("id", projectId);

  if (error) {
    console.error("Error deleting project:", error);
    throw new Error(error.message || "Failed to delete project.");
  }
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success("Project deleted.");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      // Also invalidate profile to update project count
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
  });
};