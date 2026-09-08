const FillText = {
  init() {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => this.refresh());
    } else {
      this.refresh();
    }
  },

  refresh(target) {
    const elements = target
      ? [target]
      : document.querySelectorAll('.fill-text');

    elements.forEach(svg => {
      const text = svg.querySelector('text');
      if (!text) return;

      const { x, y, width, height } = text.getBBox();

      const stroke = parseFloat(
        getComputedStyle(text).strokeWidth
      ) || 0;

      const padding = stroke / 2 + 1;

      svg.setAttribute(
        'viewBox',
        `${x - padding} ${y - padding} ${width + padding * 2} ${height + padding * 2}`
      );
    });
  }
};

export default FillText;
