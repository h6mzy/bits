const Drawer = (() => {
  let drawer;
  let backdrop;

  function init(selector = '#drawer') {
    drawer = document.querySelector(selector);

    backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';

    backdrop.addEventListener('click', close);

    document.body.appendChild(backdrop);
  }

  function open(content) {
    drawer.replaceChildren();

    if (typeof content === 'string') {
      drawer.innerHTML = content;
    } else {
      drawer.append(content);
    }
  
    drawer.classList.add('open');
    backdrop.classList.add('open');
  }

  function close() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  }

  return {
    init,
    open,
    close
  };
})();

export default Drawer;
