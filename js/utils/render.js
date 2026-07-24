export function render(container, content) {
  container.replaceChildren();

  if (typeof content === 'string') {
    container.innerHTML = content;
  } else {
    container.append(content);
  }
}
