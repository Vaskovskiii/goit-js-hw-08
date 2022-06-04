import throttle from 'lodash.throttle';

const refs = {
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('input', throttle(onFormData, 500));
refs.form.addEventListener('submit', onSubmitForm);

const formData = {};

function onFormData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmitForm(e) {
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

(function dataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (data) {
    refs.email.value = data.email;
    refs.message.value = data.message;
  }
})();
