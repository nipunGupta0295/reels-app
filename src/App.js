import './App.css';
import Signup from './Components/SignUp';
import AuthProvider from './Context/AuthProvider';
import Login from './Components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile'
import Feed from './Components/Feed'
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Feed} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;