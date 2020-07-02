import React,{useState} from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert'
import {login} from '../actions/auth'

const Login = (props) => {

  const [userData, setUserData] = useState({ email: '', password: '' });

  const { email, password } = userData;

  const handleUserData = e => {

    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]:value
      })
  }

  const handleSubmit = e => {
    console.log('dadad')
    e.preventDefault();
      login(userData);
 
  }
 
    return (
        <section className="container">
      {/* <div class="alert alert-danger">
        Invalid credentials
      </div> */}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" action="dashboard.html" onSubmit={e=>handleSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            required
            onChange={e=>handleUserData(e)}  
          />
        </div>
        <div className="form-group">
            <input
            value={password}
            type="password"
            placeholder="Password"
            name="password"
            onChange={e=>handleUserData(e)} 
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <a href="register.html">Sign Up</a>
      </p>
    </section>
    )
}

export default connect(null,{setAlert,login})(Login);