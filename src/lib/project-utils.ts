// File icon utilities using Material Icon Theme from CDN
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@main/icons';

export const getFileIconUrl = (name: string): string => {
  const lower = name.toLowerCase();
  const baseName = lower.split('/').pop() || lower;

  // Specific file names first
  if (baseName === 'package.json') return `${CDN_BASE}/npm.svg`;
  if (baseName === 'package-lock.json') return `${CDN_BASE}/npm.svg`;
  if (baseName.startsWith('vite.config')) return `${CDN_BASE}/vite.svg`;
  if (baseName.startsWith('tsconfig')) return `${CDN_BASE}/tsconfig.svg`;
  if (baseName.startsWith('tailwind.config')) return `${CDN_BASE}/tailwindcss.svg`;
  if (baseName === '.gitignore') return `${CDN_BASE}/git.svg`;
  if (baseName.startsWith('postcss.config')) return `${CDN_BASE}/postcss.svg`;
  if (baseName.startsWith('.eslintrc')) return `${CDN_BASE}/eslint.svg`;
  if (baseName.startsWith('.prettierrc') || baseName === 'prettier.config.js') return `${CDN_BASE}/prettier.svg`;
  if (baseName === 'readme.md') return `${CDN_BASE}/readme.svg`;
  if (baseName === 'netlify.toml') return `${CDN_BASE}/netlify.svg`;
  if (baseName === 'vercel.json') return `${CDN_BASE}/vercel.svg`;
  if (baseName === '.env' || baseName.startsWith('.env.')) return `${CDN_BASE}/tune.svg`;

  // Extensions
  if (/\.(jpg|jpeg|png|gif|webp|ico|bmp)$/i.test(name)) return `${CDN_BASE}/image.svg`;
  if (name.endsWith('.svg')) return `${CDN_BASE}/svg.svg`;
  if (name.endsWith('.html')) return `${CDN_BASE}/html.svg`;
  if (name.endsWith('.css')) return `${CDN_BASE}/css.svg`;
  if (name.endsWith('.scss') || name.endsWith('.sass')) return `${CDN_BASE}/sass.svg`;
  if (name.endsWith('.js')) return `${CDN_BASE}/javascript.svg`;
  if (name.endsWith('.jsx')) return `${CDN_BASE}/react.svg`;
  if (name.endsWith('.ts')) return `${CDN_BASE}/typescript.svg`;
  if (name.endsWith('.tsx')) return `${CDN_BASE}/react_ts.svg`;
  if (name.endsWith('.py')) return `${CDN_BASE}/python.svg`;
  if (name.endsWith('.json')) return `${CDN_BASE}/json.svg`;
  if (name.endsWith('.md')) return `${CDN_BASE}/markdown.svg`;
  if (name.endsWith('.sql')) return `${CDN_BASE}/database.svg`;
  if (name.endsWith('.lock')) return `${CDN_BASE}/lock.svg`;
  if (name.endsWith('.yml') || name.endsWith('.yaml')) return `${CDN_BASE}/yaml.svg`;
  if (name.endsWith('.toml')) return `${CDN_BASE}/settings.svg`;
  if (name.endsWith('.txt')) return `${CDN_BASE}/document.svg`;
  if (name.endsWith('.cpp') || name.endsWith('.h')) return `${CDN_BASE}/cpp.svg`;
  if (name.endsWith('.c')) return `${CDN_BASE}/c.svg`;
  if (name.endsWith('.cs')) return `${CDN_BASE}/csharp.svg`;
  if (name.endsWith('.java')) return `${CDN_BASE}/java.svg`;
  if (name.endsWith('.go')) return `${CDN_BASE}/go.svg`;
  if (name.endsWith('.rs')) return `${CDN_BASE}/rust.svg`;
  if (name.endsWith('.php')) return `${CDN_BASE}/php.svg`;
  if (name.endsWith('.rb')) return `${CDN_BASE}/ruby.svg`;

  // Folder
  if (!baseName.includes('.')) return `${CDN_BASE}/folder.svg`;

  // Default file icon
  return `${CDN_BASE}/file.svg`;
};

export const getFolderIconUrl = (): string => {
  return `${CDN_BASE}/folder.svg`;
};

export const getFolderOpenIconUrl = (): string => {
  return `${CDN_BASE}/folder-open.svg`;
};

// Helper to determine if path is a folder
export const isFolderPath = (files: { path: string }[], path: string): boolean => {
  return files.some(f => f.path.startsWith(path + '/'));
};
