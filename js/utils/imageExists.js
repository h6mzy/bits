export function imageExists(
  url,
  fallback = 'https://cdn.jsdelivr.net/gh/h6mzy/bits@1.11.11/examples/img/placeholder.webp'
) {
  return new Promise(resolve => {
    const img = new Image();

    img.onload = () => resolve(url);
    img.onerror = () => resolve(fallback);

    img.src = url;
  });
}
