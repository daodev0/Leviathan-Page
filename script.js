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

  const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL';

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (formStatus) {
        formStatus.textContent = 'Enviando tu mensaje...';
        formStatus.style.color = '#7ef0d8';
      }

      if (APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_WEB_APP_URL') {
        if (formStatus) {
          formStatus.textContent = 'Configura la URL de tu Google Apps Script para enviar los mensajes.';
          formStatus.style.color = '#f7b267';
        }
        return;
      }

      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      try {
        const response = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Error del servidor');
        }

        if (formStatus) {
          formStatus.textContent = '¡Mensaje enviado correctamente!';
          formStatus.style.color = '#7ef0d8';
        }

        contactForm.reset();
      } catch (error) {
        if (formStatus) {
          formStatus.textContent = 'No se pudo enviar el mensaje. Inténtalo de nuevo.';
          formStatus.style.color = '#f7b267';
        }
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
