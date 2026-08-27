export function imageExists(url, fallback) {
  return new Promise(resolve => {
    const img = new Image();

    img.onload = () => resolve(url);
    img.onerror = () => resolve(fallback);

    img.src = url;
  });
}
