document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const cartCountElement = document.getElementById('cart-count');
  let cartCount = Number(localStorage.getItem('leviathanCartCount')) || 0;

  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      if (formStatus) {
        formStatus.textContent = 'Enviando tu mensaje...';
        formStatus.style.color = '#7ef0d8';
      }
    });
  }

  document.querySelectorAll('[data-add-to-cart]').forEach((button) => {
    button.addEventListener('click', () => {
      cartCount += 1;
      localStorage.setItem('leviathanCartCount', String(cartCount));

      if (cartCountElement) {
        cartCountElement.textContent = cartCount;
      }

      const originalText = button.textContent;
      button.textContent = 'Agregado';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 900);
    });
  });

  document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedFilter = button.dataset.filter;
      document.querySelectorAll('.product-card').forEach((card) => {
        const matches = selectedFilter === 'all' || card.dataset.category === selectedFilter;
        card.classList.toggle('product-hidden', !matches);
      });
    });
  });
});
