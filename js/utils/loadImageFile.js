export const loadImageFile = file => new Promise((resolve, reject) => {
  const img = new Image();
  const url = URL.createObjectURL(file);

  img.onload = () => {
    URL.revokeObjectURL(url);
    resolve(img);
  };

  img.onerror = () => {
    URL.revokeObjectURL(url);
    reject(new Error('Failed to load image'));
  };

  img.src = url;
});
