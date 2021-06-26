import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Test from './components/Test'
import UserProfile from './components/UserProfile'
import AdminProfile from './components/adminProfile';
import Products from './components/Products';
import {BrowserRouter,Link,Switch,Route,Redirect} from 'react-router-dom'
import { useState } from 'react';

function App() {

  const [userLoginState, setUserLoginState] = useState(false)
  // Logout
  const onLogout = () => {
    localStorage.clear();
    setUserLoginState(false)
  }
  return (
    <div>
      <BrowserRouter>
      {/* Nav bar */}
       <ul className="nav justify-content-center">
       <li className="nav-item">
           <Link className="nav-link text-light" to="/test">TEST</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link text-light" to="/home">HOME</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link text-light" to="/register">REGISTER</Link>
         </li>
         {!userLoginState ?
              <li className="nav-item">
                <Link to="/login" className="nav-link text-light">LOGIN</Link>
              </li> :
              <li className="nav-item">
                <Link to="/login" className="nav-link text-light"
                 onClick={() => onLogout()}>LOGOUT</Link>
              </li>
            }
       </ul>

      {/* Routing */}
      <Switch>
      <Route path="/test">
          <Test />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
        <Login setUserStatus={setUserLoginState} />
        </Route>
        <Route path="/userprofile/:name">
          <UserProfile />
        </Route>
        <Route path="/adminprofile/:name">
          <AdminProfile />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
