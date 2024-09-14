document.addEventListener('DOMContentLoaded', () => {
  // Login and Signup form element selectors
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const firstname_input = document.getElementById('firstname-input');
  const email_input = document.getElementById('email-input');
  const password_input = document.getElementById('password-input');
  const repeat_password_input = document.getElementById('repeat-password-input');
  const error_message = document.getElementById('error-message');
  
  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email-input').value;
      const password = document.getElementById('password-input').value;
      console.log('Login form submitted with:', { email, password });

      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('2 Login successful, token received from server:', data.token);

          // Store the token in localStorage
          localStorage.setItem('token', data.token);
          console.log('Token stored in localStorage:', data.token);  // Log after saving token

          // Redirect to the home page
          window.location.href = '/';
        } else {
          console.log('Login failed');
          const errorData = await response.json();
          console.log('Error message:', errorData.message);
          error_message.innerText = errorData.message;
        }
      } catch (error) {
        console.error('Error during login request:', error);
      }
    });
  }
  
  // Handle signup form submission and validation
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Signup form submitted');
      let errors = getSignupFormErrors(
        firstname_input.value,
        email_input.value,
        password_input.value,
        repeat_password_input.value
      );

      if (errors.length > 0) {
        console.log('Signup validation errors:', errors);
        error_message.innerText = errors.join('. ');
      } else {
        const firstname = firstname_input.value;
        const email = email_input.value;
        const password = password_input.value;
        console.log('Submitting signup with:', { firstname, email, password });

        try {
          const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstname, email, password }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('3 Signup successful, token received from server:', data.token);

            localStorage.setItem('token', data.token);  // Store the token
            console.log('Token stored in localStorage:', data.token);  // Log after saving token

            window.location.href = '/';  // Redirect to homepage after login
          } else {
            console.log('Signup failed');
            const errorData = await response.json();
            console.log('Error message:', errorData.message);
            error_message.innerText = errorData.message;
          }
        } catch (error) {
          console.error('Error during signup request:', error);
        }
      }
    });

    const allSignupInputs = [firstname_input, email_input, password_input, repeat_password_input];

    allSignupInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
          input.parentElement.classList.remove('incorrect');
          error_message.innerText = '';
        }
      });
    });
  }
  
  // Signup form validation
  function getSignupFormErrors(firstname, email, password, repeatpassword) {
    let errors = [];

    if (firstname === '' || firstname == null) {
      errors.push('Firstname is required');
      console.log('Firstname validation error');
      firstname_input.parentElement.classList.add('incorrect');
    }
    if (email === '' || email == null) {
      errors.push('Email is required');
      console.log('Email validation error');
      email_input.parentElement.classList.add('incorrect');
    }
    if (password === '' || password == null) {
      errors.push('Password is required');
      console.log('Password validation error');
      password_input.parentElement.classList.add('incorrect');
    }
    if (password.length < 8) {
      errors.push('Password must have at least 8 characters');
      console.log('Password length validation error');
    }
    if (password !== repeatpassword) {
      errors.push('Password does not match repeated password');
      console.log('Password mismatch validation error');
      password_input.parentElement.classList.add('incorrect');
      repeat_password_input.parentElement.classList.add('incorrect');
    }
    return errors;
  }

  // Login form validation (optional if you want to add more validation)
  function getLoginFormErrors(email, password) {
    let errors = [];

    if (email === '' || email == null) {
      errors.push('Email is required');
      console.log('Login email validation error');
      email_input.parentElement.classList.add('incorrect');
    }
    if (password === '' || password == null) {
      errors.push('Password is required');
      console.log('Login password validation error');
      password_input.parentElement.classList.add('incorrect');
    }
    return errors;
  }
});
