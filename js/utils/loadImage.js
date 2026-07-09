export const loadImage = (img, file) => {
  const url = URL.createObjectURL(file);

  img.onload = () => URL.revokeObjectURL(url);
  img.onerror = () => URL.revokeObjectURL(url);

  img.src = url;
}
