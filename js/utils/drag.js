export const drag = (el, {
  start = () => {},
  move = () => {},
  end = () => {}
} = {}) => {
  let active = false;

  el.addEventListener('pointerdown', e => {
    active = true;
    el.setPointerCapture(e.pointerId);
    start(e);
  });

  el.addEventListener('pointermove', e => {
    if (!active) return;
    move(e);
  });

  el.addEventListener('pointerup', e => {
    if (!active) return;
    active = false;
    end(e);
  });
}
