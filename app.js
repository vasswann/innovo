document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const closeButton = document.querySelector('.close-button');
  const navbar = document.querySelector('.navbar');

  // Function to hide the menu and buttons

  function hideHamburgerMenu() {
    hamburgerMenu.style.display = 'none';
  }

  // Function to show hamburger menu button
  function showHamburgerMenu() {
    hamburgerMenu.style.display = 'block';
  }

  // Add click event listener to the hamburger menu button
  hamburgerMenu.addEventListener('click', function () {
    navbar.classList.toggle('active');
    hamburgerMenu.style.display = navbar.classList.contains('active')
      ? 'none'
      : 'block';
    closeButton.style.display = navbar.classList.contains('active')
      ? 'block'
      : 'none';
  });
  // Add click event listener to the close button
  closeButton.addEventListener('click', function () {
    navbar.classList.remove('active');
    closeButton.style.display = 'none';
    hamburgerMenu.style.display = 'block';
  });

  // Event listener for window resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 899 && !navbar.classList.contains('active')) {
      hideHamburgerMenu();
    } else if (
      window.innerWidth <= 899 &&
      !navbar.classList.contains('active')
    ) {
      showHamburgerMenu();
    } else if (window.innerWidth > 899 && navbar.classList.contains('active')) {
      closeButton.style.display = 'none';
    } else if (
      window.innerWidth <= 899 &&
      navbar.classList.contains('active')
    ) {
      closeButton.style.display = 'block';
    }
  });
});

// Smoth scroll
// ======================================
// Smooth scrolling for menu links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function(e) {
//     e.preventDefault();

//     const targetId = this.getAttribute('href').substring(1);
//     const targetElement = document.getElementById(targetId);

//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   });
// });
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    const navbarHeight = document.querySelector('nav').offsetHeight;

    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  });
});

// Contact form validation with javascript
// =======================================
const form = document.getElementById('contact-form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

// Show input error message
function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';
  const small = formGroup.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

// Check email is valid
function checkEmail(input) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm() {
  checkLength(name, 3, 20);
  checkLength(message, 10, 500);
  checkEmail(email);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([name, email, message]);
  validateForm();
});

// Add event listeners for form field inputs
name.addEventListener('input', () => {
  checkLength(name, 3, 20);
});
email.addEventListener('input', () => {
  checkEmail(email);
});
message.addEventListener('input', () => {
  checkLength(message, 10, 500);
});
