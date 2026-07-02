const styles = new Map();

export function injectPseudoStyle(element, pseudo, styleObject) {
  if (!styleObject) return () => {};

  const id = crypto.randomUUID();

  element.dataset.bits = id;

  const style = document.createElement('style');

  style.textContent = `
    [data-bits="${id}"]${pseudo} {
      ${toCSS(styleObject)}
    }
  `;

  document.head.append(style);

  styles.set(id, style);

  return () => {
    style.remove();
    styles.delete(id);
    delete element.dataset.bits;
  };
}

function toCSS(obj) {
  return Object.entries(obj)
    .map(([key, value]) => {
      const prop = key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
      return `${prop}: ${value};`;
    })
    .join('\n');
}
