import React,{useState} from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert'
import { login, register } from '../actions/auth'
import { Redirect } from 'react-router-dom'

const Login = ({ login,isAuthenticated }) => {

  const [userData, setUserData] = useState({ email: '', password: '' });
  const { email, password } = userData;

  const handleUserData = e => {

    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]:value
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
   
    login(userData);
    console.log(userData)
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

 
    return (
        <section className="container">
      {/* <div class="alert alert-danger">
        Invalid credentials
      </div> */}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" action="dashboard.html" onSubmit={e=>onSubmit(e)}>
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

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
}

export default connect(mapStateToProps, { setAlert,login })(Login);