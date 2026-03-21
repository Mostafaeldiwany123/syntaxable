const getEditorVar = (name: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return val || fallback;
};

export const getDynamicTheme = (): any => ({
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
        'diffEditor.insertedLineBackground': '#10b98115',
        'diffEditor.removedLineBackground': '#ef444415',
        'diffEditor.insertedTextBackground': '#10b98130',
        'diffEditor.removedTextBackground': '#ef444430',
    }
});