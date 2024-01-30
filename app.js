const form = document.getElementById('fb-require-validation');

form.addEventListener('submit', event => {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('fv-invalid');
  }
  else form.classList.remove('fv-invalid');
  
}, false)
