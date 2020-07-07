import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../../actions/auth'

const Navbar = ({ loading, isAuthenticated, logout }) => {
  
  const handleLogout = () => {
    logout();
    return <Redirect to='/login' />
  }
  
  const userLink = (
    <ul>
    <li>
     <a href='profiles.html'>Developers</a>
      </li>
      
      <li>
     <Link to='/dashboard'>Dashboard</Link>
    </li>
    <li>
      <a onClick={handleLogout}>Logout</a>
    </li>
  </ul>
  )

  const guestLink = (
    <ul>
    <li>
     <a href='profiles.html'>Developers</a>
      </li>
  
    <li>
      <Link to ='/register'>Register</Link>
    </li>
    <li>
      <Link to ='/login'>Login</Link>
    </li>
  </ul>
  )
  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-code'></i> DevConnector
          </Link>
        </h1>
    {!loading && isAuthenticated ? userLink:guestLink }
      </nav>
</div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{logout})(Navbar);
