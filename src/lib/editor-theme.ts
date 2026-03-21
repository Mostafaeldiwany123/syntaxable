const getEditorVar = (name: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return val || fallback;
};

export const getCustomDarkTheme = (): any => ({
    base: getEditorVar('--editor-base', 'vs-dark') as any,
    inherit: true,
    rules: [
        { token: '', background: getEditorVar('--editor-bg', '#121212').replace('#', '') },
    ],
    colors: {
        'editor.background': getEditorVar('--editor-bg', '#121212'),
        'editor.foreground': getEditorVar('--editor-fg', '#E6EDF3'),
        'editor.lineHighlightBackground': getEditorVar('--editor-line-highlight', '#121212'),
        'editorLineNumber.foreground': getEditorVar('--editor-line-number', '#4E5565'),
        'editorLineNumber.activeForeground': getEditorVar('--editor-line-number-active', '#8B949E'),
        'editor.selectionBackground': getEditorVar('--editor-selection', '#264F78'),
        'editor.inactiveSelectionBackground': getEditorVar('--editor-selection-inactive', '#121212'),
        'editorIndentGuide.background': getEditorVar('--editor-indent-guide', '#2D2F36'),
        'editorIndentGuide.activeBackground': getEditorVar('--editor-indent-guide-active', '#3B3E45'),
        'diffEditor.insertedTextBackground': '#22c55e20',
        'diffEditor.removedTextBackground': '#ef444420',
        'diffEditor.insertedLineBackground': '#121212',
        'diffEditor.removedLineBackground': '#121212',
    }
});