import { useState, useEffect, useCallback } from 'react';

export interface ChatSession {
  id: string;
  name: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    reasoning?: string;
    timestamp: string;
  }>;
  context?: {
    type: 'practice' | 'project';
    problemTitle?: string;
    problemDescription?: string;
    code?: string;
    language?: string;
    fileName?: string;
    files?: { name: string; content: string }[];
  };
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'syntaxable-chat-history';
const MAX_HISTORY_ITEMS = 50;

export function useChatHistory() {
  const [history, setHistory] = useState<ChatSession[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      }
    } catch (error) {
      console.error('[useChatHistory] Failed to load history:', error);
    }
  }, []);

  // Create a new chat session
  const createSession = useCallback((
    firstMessage: string,
    context?: ChatSession['context']
  ): ChatSession => {
    const now = new Date().toISOString();
    return {
      id: `chat-${Date.now()}`,
      name: firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : ''),
      messages: [],
      context,
      createdAt: now,
      updatedAt: now,
    };
  }, []);

  // Save a session to history
  const saveSession = useCallback((session: ChatSession) => {
    setHistory(prev => {
      // Check if session already exists
      const existingIndex = prev.findIndex(s => s.id === session.id);
      
      let newHistory: ChatSession[];
      if (existingIndex >= 0) {
        // Update existing session
        newHistory = [...prev];
        newHistory[existingIndex] = { ...session, updatedAt: new Date().toISOString() };
      } else {
        // Add new session at the beginning
        newHistory = [session, ...prev];
      }
      
      // Limit history size
      if (newHistory.length > MAX_HISTORY_ITEMS) {
        newHistory = newHistory.slice(0, MAX_HISTORY_ITEMS);
      }
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('[useChatHistory] Failed to save history:', error);
      }
      
      return newHistory;
    });
  }, []);

  // Delete a session from history
  const deleteSession = useCallback((sessionId: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(s => s.id !== sessionId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('[useChatHistory] Failed to save history:', error);
      }
      return newHistory;
    });
  }, []);

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('[useChatHistory] Failed to clear history:', error);
    }
  }, []);

  // Get a session by ID
  const getSession = useCallback((sessionId: string): ChatSession | undefined => {
    return history.find(s => s.id === sessionId);
  }, [history]);

  return {
    history,
    createSession,
    saveSession,
    deleteSession,
    clearHistory,
    getSession,
  };
}