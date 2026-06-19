export const loadImage = (img, blob) => {
  const url = URL.createObjectURL(blob);

  img.onload = () => URL.revokeObjectURL(url);
  img.onerror = () => URL.revokeObjectURL(url);

  img.src = url;
}
