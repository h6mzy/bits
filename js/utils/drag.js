export function drag(el, {
  start = () => {},
  move = () => {},
  end = () => {}
} = {}) {
  let startX;
  let startY;

  el.addEventListener('pointerdown', e => {
    startX = e.clientX;
    startY = e.clientY;

    el.setPointerCapture(e.pointerId);

    start({
      event: e,
      x: startX,
      y: startY
    });
  });

  el.addEventListener('pointermove', e => {
    if (!el.hasPointerCapture(e.pointerId)) return;

    move({
      event: e,
      x: e.clientX,
      y: e.clientY,
      dx: e.clientX - startX,
      dy: e.clientY - startY
    });
  });

  el.addEventListener('pointerup', e => {
    if (!el.hasPointerCapture(e.pointerId)) return;

    end({
      event: e,
      x: e.clientX,
      y: e.clientY,
      dx: e.clientX - startX,
      dy: e.clientY - startY
    });
  });
}
