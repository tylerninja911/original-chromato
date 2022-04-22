import './App.css';
import NavBar from './Components/appbar';
import { useState, useEffect } from 'react';
import Login from './Components/Modals/Login';
import Signup from './Components/Modals/Signup';
import Home from './Views/Home/home';
import Cart from './Views/Cart/cart';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import 'firebase/auth';
import ProtectedRoute from './Views/ProtectedRoute';
import Dashboard from './Views/Dashboard/dashboard';
import MenuItemDetails from './Views/MenuItemDetails/MenuItemDetails';
import UserOrders from './Views/UserOrders/UserOrders';
import ManageItems from './Views/ManageItems/index';
import SideBar from './Views/Dashboard/SideBar';
import ManageUsers from './Views/ManageUsers';

function useScrollToTop(){

  const location = useLocation();

  useEffect(() => {

    window.scrollTo(0, 0)

  }, [location.pathname])

}

function App() {

  useScrollToTop();

  let dispatch = useDispatch();
  const showLogin = useSelector(state => state.modalReducer.showLoginModal);
  const showSignUp = useSelector(state => state.modalReducer.showSignUpModal);
  const [showCartPreview, setShowCartPreview] = useState(false);

  const user = useSelector((state) => state.loggedReducer);

  function getUserName(email) {
    let userName = email.split('@')[0]
    return userName.charAt(0).toUpperCase() + userName.slice(1);
  }

  
  //   firebase.auth().onAuthStateChanged((user)=>{if(user){
  // //     let userName = user.displayName;
  // //     if(userName=== null){
  // //       userName = getUserName(user.email);
  // //     }
  // //     dispatch({type:'SIGN_IN',payload:{
  // //       userName: userName,
  // //       userEmail:user.email
  // //     }})

  // //   }
  // // else{
  // //   dispatch({type:'SIGN_OUT'})
  // console.log(user.displayName);
  // }
  // })

  // if(showLogin || showSignUp || showLogin2){
  //   document.body.style.overflow = 'hidden';
  // }
  // else{
  //   document.body.style.overflow = 'auto';

  // }

  const escFunction = (event) => {
    if (event.keyCode === 27) {
        dispatch({type:'HIDE_ALL_MODALS'})
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     // //     if(userName=== null){
  //     // //       userName = getUserName(user.email);
  //     // //     }
  //     // //     dispatch({type:'SIGN_IN',payload:{
  //     // //       userName: userName,
  //     // //       userEmail:user.email
  //     // //     }})

  //     // //   }
  //     // // else{
  //     // //   dispatch({type:'SIGN_OUT'})
  //     // console.log(user.displayName);
  //     // }
  //     if (user) {
  //       let userName = user.displayName;
  //       if (userName === null) {
  //         userName = getUserName(user.email);
  //       }
  //       dispatch({
  //         type: 'SIGN_IN',
  //         payload: {
  //           userName: userName,
  //           userEmail: user.email,
  //         },
  //       });
  //     } else {
  //       if (!localStorage.token) dispatch({ type: 'SIGN_OUT' });
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  return (
    
      <div className="App">
        {showLogin && <Login />}
        {showSignUp && <Signup />}
        <Switch>
          <Route exact path="/">
            <NavBar/>
            <Home />
          </Route>

          <ProtectedRoute path="/dashboard" >
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute path="/cart">
            <Cart/>
          </ProtectedRoute>

          <ProtectedRoute path="/order-history">
            <UserOrders/>            
          </ProtectedRoute>

          <ProtectedRoute path='/item-management'>
            <ManageItems/>
          </ProtectedRoute>

          <ProtectedRoute path='/user-management'>
            <ManageUsers/>
          </ProtectedRoute>
          
          <Route path="/menu-item/:id">
            <MenuItemDetails />
          </Route>

          <Route exact path="*">
            <h2 className="ml-12 mt-16 text-sm">
              The page you were looking for was not found.
            </h2>
            <Link to="/">
              <h2 className="underline text-sm mt-16 ml-12">
                Go back to main page
              </h2>
            </Link>
          </Route>
        </Switch>
      </div>
    
  );
}

export default App;