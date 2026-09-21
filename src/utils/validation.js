export const validateFile = (file, allowedTypes, maxSizeBytes) => {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValidFile: false,
      message: `Invalid file type (${file.type}). Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  if (file.size > maxSizeBytes) {
    return {
      isValidFile: false,
      message: `File size exceeds ${maxSizeBytes / (1024 * 1024)}MB limit`,
    };
  }

  return { isValidFile: true, file: file };
};
