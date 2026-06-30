export function drag(el, {
  start = () => {},
  move = () => {},
  end = () => {}
} = {}) {
  let startX;
  let startY;

  el.style.touchAction = 'none';

  el.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;

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

  ['pointerup', 'pointercancel'].forEach(type =>
    el.addEventListener(type, e => {
      if (!el.hasPointerCapture(e.pointerId)) return;

      el.releasePointerCapture(e.pointerId);

      end({
        event: e,
        x: e.clientX,
        y: e.clientY,
        dx: e.clientX - startX,
        dy: e.clientY - startY
      });
    })
  );
}
