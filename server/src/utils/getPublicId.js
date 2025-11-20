export const extractPublicId = (url) => {
    if (!url) return null;
  
    try {
      const parts = url.split("/upload/");
      const path = parts[1].split(".")[0]; // remove extension
      return path;
    } catch {
      return null;
    }
  };
  