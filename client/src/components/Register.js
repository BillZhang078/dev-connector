import React, { useState } from 'react';
import API from '../API/api';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = registerData;

  const handleDataChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(registerData);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('wrong');
    }
    const user = {
      name,
      email,
      password,
    };

    try {
      const response = await API.post('/users/register', user);
      console.log(response);
    } catch (error) {
      console.log(error.responsive.data);
    }
  };

  return (
    <section class='container'>
      <h1 class='large text-primary'>Sign Up</h1>
      <p class='lead'>
        <i class='fas fa-user'></i> Create Your Account
      </p>
      <form
        class='form'
        action='create-profile.html'
        onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => handleDataChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => handleDataChange(e)}
          />
          <small class='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div class='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            minLength='6'
            onChange={(e) => handleDataChange(e)}
          />
        </div>
        <div class='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            value={confirmPassword}
            minLength='6'
            onChange={(e) => handleDataChange(e)}
          />
        </div>
        <input type='submit' class='btn btn-primary' value='Register' />
      </form>
      <p class='my-1'>
        Already have an account? <a href='login.html'>Sign In</a>
      </p>
    </section>
  );
};

export default Register;
