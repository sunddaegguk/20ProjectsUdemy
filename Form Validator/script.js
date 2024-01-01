const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement; //form-control
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
//Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//Check email is valid
function checkEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// function isValidEmail(email) {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(String(email).toLowerCase());
// }

//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFiledname(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFiledname(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFiledname(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
//Check passwords match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

//Get fieldname
function getFiledname(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
  //   if (username.value === '') {
  //     showError(username, 'Username is required');
  //   } else {
  //     showSuccess(username);
  //   }
  //   if (email.value === '') {
  //     showError(email, 'Email is required');
  //   } else if (!isValidEmail(email.value)) {
  //     showError(email, 'Email is not  valid');
  //   } else {
  //     showSuccess(email);
  //   }
  //   if (password.value === '') {
  //     showError(password, 'Password is required');
  //   } else {
  //     showSuccess(password);
  //   }
  //   if (password2.value === '') {
  //     showError(password2, 'Password2 is required');
  //   } else {
  //     showSuccess(password2);
  //   }
});
