import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/navbar';
import Landing from './components/layouts/landing';
import Login from './components/Login';
import Register from './components/Register'
import DashBoard from './components/DashBoard/dashboard'
import PrivateRoute from './components/Routing/PrivateRoute'
import { Provider } from 'react-redux';
import store from './store'
import Alert from './components/layouts/alert'
import { setAuthToken } from './util/index'
import { loadUser } from './actions/auth'
import './App.css';

if (localStorage.token) {
    console.log('here')
    setAuthToken(localStorage.token)
}
function App() {

  useEffect(() => {
    
    store.dispatch(loadUser());
    
  },[])
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Navbar />
        <Route path="/" exact component={Landing} />
      <div className='container'>
        <Alert/>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/dashboard' component={DashBoard} />
          </Switch>
      </div>
      </div>
      </Router>
      </Provider>
  );
}

export default App;
