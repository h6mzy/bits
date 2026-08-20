export const createElement = (element, props = {}) => {
  const el = document.createElement(element);

  for (const [key, value] of Object.entries(props)) {
    if (key === 'dataset') {
      Object.assign(el.dataset, value);
    } else if (key === 'style') {
      for (const [property, propertyValue] of Object.entries(value)) {
        if (property.startsWith('--')) {
          el.style.setProperty(property, propertyValue);
        } else {
          el.style[property] = propertyValue;
        }
      }
    } else {
      el[key] = value;
    }
  }

  return el;
};
