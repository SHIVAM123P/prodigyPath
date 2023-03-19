// script.js

const modal = document.querySelector('.modal');
const modalLanguage = document.querySelector('.modal-language');
const enrollButtons = document.querySelectorAll('.enroll-button');
const close = document.querySelector('.close');
const enrollForm = document.querySelector('#enroll-form');

// script.js
enrollButtons.forEach(button => {
    button.addEventListener('click', () => {
      const language = button.dataset.language;
      modalLanguage.textContent = language;
      document.querySelector('#language').value = language; // set the value of the hidden input field
      modal.style.display = 'block';
    });
  });
  

close.addEventListener('click', () => {
  modal.style.display = 'none';
});

enrollForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = event.target.elements.name.value;
  const email = event.target.elements.email.value;
  const language = modalLanguage.textContent;
  
  $.ajax({
    url: '/enroll',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
      name,
      email,
      language
    }),
    success: () => {
      const button = document.querySelector(`[data-language="${language}"]`);
      button.textContent = 'Enrolled - Visit Office for Classes';
      button.disabled = true;
      modal.style.display = 'none';
    },
    error: error => {
      console.error(error);
    }
  });
});
