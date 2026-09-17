export const dynamicYears = () => {
  document.querySelectorAll('.bits-current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
};
