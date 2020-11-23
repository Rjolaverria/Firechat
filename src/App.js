import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Chatroom from './pages/Chatroom';
import Register from './pages/Register';
import PasswordReset from './pages/PasswordReset';
import { Navbar } from './components';

function App() {
  return (
      <div className='App'>
          <Router>
              <Navbar />
              <Switch>
                  <Route exact path='/'>
                      <Chatroom />
                  </Route>
                  <Route exact path='/login'>
                      <Login />
                  </Route>
                  <Route exact path='/register'>
                      <Register />
                  </Route>
                  <Route exact path='/resetpassword'>
                      <PasswordReset />
                  </Route>
              </Switch>
          </Router>
      </div>
  );
}

export default App;
