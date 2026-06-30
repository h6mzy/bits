export function drag(el, {
  start = () => {},
  move = () => {},
  end = () => {}
} = {}) {
  let startX = 0;
  let startY = 0;

  const onPointerDown = e => {
    if (e.button !== 0) return;

    startX = e.clientX;
    startY = e.clientY;

    el.setPointerCapture(e.pointerId);

    start({
      event: e,
      x: startX,
      y: startY
    });
  };

  const onPointerMove = e => {
    if (!el.hasPointerCapture(e.pointerId)) return;

    move({
      event: e,
      x: e.clientX,
      y: e.clientY,
      dx: e.clientX - startX,
      dy: e.clientY - startY,
      movementX: e.movementX,
      movementY: e.movementY
    });
  };

  const onPointerEnd = e => {
    if (!el.hasPointerCapture(e.pointerId)) return;

    el.releasePointerCapture(e.pointerId);

    end({
      event: e,
      x: e.clientX,
      y: e.clientY,
      dx: e.clientX - startX,
      dy: e.clientY - startY
    });
  };

  el.style.touchAction = 'none';

  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointermove', onPointerMove);
  el.addEventListener('pointerup', onPointerEnd);
  el.addEventListener('pointercancel', onPointerEnd);

  return {
    destroy() {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerEnd);
      el.removeEventListener('pointercancel', onPointerEnd);
    }
  };
}
