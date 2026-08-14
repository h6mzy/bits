const SVG_NS = 'http://www.w3.org/2000/svg';

export const createSvgText = (text, className = '') => {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.className.baseVal = className;

  const textEl = document.createElementNS(SVG_NS, 'text');
  textEl.textContent = text;

  svg.append(textEl);

  return svg;
};
