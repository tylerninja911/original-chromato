import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// export default function ProtectedRoute({isLoggedIn:isLoggedIn,path, ScrollToTop, Cart}){
export default function ProtectedRoute({ path, children, location }) {
  const user = useSelector((state) => state.loggedReducer);

  const isLoggedIn = user.userName || localStorage.getItem('token');
  return (
    <Route
    exact
      path={path}
      render={(props) => {
        if (isLoggedIn) {
          return <>{children}</>;
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: location } }} />
          );
        }
      }}
    ></Route>
  );
}
