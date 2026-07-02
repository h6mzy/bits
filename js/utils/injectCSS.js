function toCSS(styles) {
  return Object.entries(styles)
    .map(([key, value]) =>
      `${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${value};`
    )
    .join('\n');
}

export function injectCSS(selector, styles) {
  if (!styles) return () => {};

  const style = document.createElement('style');

  style.textContent = `
    ${selector} {
      ${toCSS(styles)}
    }
  `;

  document.head.append(style);

  return () => style.remove();
}
