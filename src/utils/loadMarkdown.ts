export const loadMarkdownContent = async (path: string): Promise<string> => {
  try {
    // path like './mission-1/module-1.md'
    const content = await import(/* @vite-ignore */ `${path}?raw`);
    return content.default as string;
  } catch (err) {
    console.error("Load failed:", path, err);
    return "# Error Loading Content\nFile not found.";
  }
};
