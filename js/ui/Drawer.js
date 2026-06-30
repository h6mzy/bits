const Drawer = (() => {
  let drawer;

  function init(parent = document.body) {
    drawer = document.createElement('aside');
    drawer.id = 'drawer';

    parent.appendChild(drawer);

    drawer.addEventListener('click', e => {
      if (e.target === drawer) close();
    });
  }

  function open(content) {
    drawer.replaceChildren();

    if (typeof content === 'string') {
      drawer.innerHTML = content;
    } else {
      drawer.append(content);
    }

    drawer.classList.add('open');

    return drawer;
  }

  function close() {
    drawer.classList.remove('open');
  }

  return {
    init,
    open,
    close
  };
})();

export default Drawer;
