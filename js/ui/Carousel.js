import { createElement } from '../index.js';

const Carousel = ({
  slides = [],
  gap = '1rem',
  padding = '1rem',
  slideWidth = '90%'
} = {}) => {

  const carousel = createElement('div', {
    className: 'carousel',
    style: {
      '--carousel-gap': gap,
      '--carousel-padding': padding,
      '--carousel-slide-width': slideWidth,
      display: 'flex',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none',
      overscrollBehavior: 'contain',
      gap: 'var(--carousel-gap)',
      padding: 'var(--carousel-padding)'
    }
  });

  const createSlide = content => {
    const slide = createElement('article', {
      className: 'slide',
      style: {
        flex: '0 0 var(--carousel-slide-width)',
        scrollSnapAlign: 'center',
        width: '100%',
        height: '100%'
      }
    });

    if (content instanceof Node) {
      slide.append(content);
    } else {
      slide.textContent = content;
    }

    return slide;
  };

  carousel.append(
    ...slides.map(createSlide)
  );

  return carousel;
};

export default Carousel;
