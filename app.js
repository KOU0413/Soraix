/* global document, setTimeout, FormData, fetch, alert, console */
// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Modal controls
const modal = document.getElementById('joinModal');
const openJoin = document.getElementById('openJoin');
const openJoin2 = document.getElementById('openJoin2');
const closeBtn = document.getElementById('closeModal');
const backdrop = modal ? modal.querySelector('[data-backdrop]') : null;

function openModal() {
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  // Allow transition, then hide
  setTimeout(() => modal.classList.add('hidden'), 160);
}

[openJoin, openJoin2].forEach(btn => btn && btn.addEventListener('click', openModal));
closeBtn && closeBtn.addEventListener('click', closeModal);
backdrop && backdrop.addEventListener('click', closeModal);

// Form submission (Formspree)
const form = document.getElementById('joinForm');
const successEl = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    // Basic validation fallback
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email.');
      return;
    }

    submitBtn && (submitBtn.disabled = true);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        successEl && successEl.classList.remove('hidden');
        form.reset();
        setTimeout(() => {
          closeModal();
          successEl && successEl.classList.add('hidden');
        }, 1200);
      } else {
        const text = await res.text();
        console.error('Formspree error:', text);
        alert('Submission failed. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again later.');
    } finally {
      submitBtn && (submitBtn.disabled = false);
    }
  });
}
