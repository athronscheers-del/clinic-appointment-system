// Modal handling for Sign In
const signInBtn = document.getElementById('signInBtn');
const signInModal = document.getElementById('signInModal');
const heroBookBtn = document.getElementById('heroBookBtn');

signInBtn.addEventListener('click', () => {
  signInModal.classList.remove('hidden');
});

heroBookBtn.addEventListener('click', () => {
  signInModal.classList.remove('hidden');
});

document.querySelectorAll('.close-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-close');
    document.getElementById(modalId).classList.add('hidden');
  });
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  if (e.target === signInModal) {
    signInModal.classList.add('hidden');
  }
});

// Sign Up button placeholder — we'll wire this once auth pages exist
document.getElementById('signUpBtn').addEventListener('click', () => {
  window.location.href = 'patient-register.html';
});