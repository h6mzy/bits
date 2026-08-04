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
      svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
    });
  }
};

export default FillText;
