import './App.scss';
import { useRoutes, useLocation } from 'react-router-dom';
import ANONROUTES from './auth/Routes';
import { AuthContext, BuildContext } from './auth/Auth';
import ROUTES from './Routes';
import Navigation from './navigation/Navigation';

function App() {
  const router = useRoutes(ROUTES);
  const anonRouter = useRoutes(ANONROUTES);
  const location = useLocation();

  const jwt = localStorage.getItem("jwt");
  let authProvider = undefined;

  if (location.pathname.substring(1).split('/')[0] === "GymFrontend" && window.history.replaceState) {
    window.history.replaceState("", "", "/");
  }

  if (jwt === null) {
    return (
      <div className='login-container'>
        {anonRouter}
      </div>
    )
  }

  authProvider = BuildContext(jwt);

  return (
    <div className="App">
        <AuthContext.Provider value={authProvider}>
          <Navigation />
          {router}
        </AuthContext.Provider>
    </div>
  );
}

export default App;
