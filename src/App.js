import './App.scss';
import { useRoutes } from 'react-router-dom';
import ANONROUTES from './auth/Routes';
import { AuthContext, BuildContext } from './auth/Auth';
import ROUTES from './Routes';
import { Navigation } from './navigation/Navigation';

function App() {
  const router = useRoutes(ROUTES);
  const anonRouter = useRoutes(ANONROUTES);

  const jwt = sessionStorage.getItem("jwt");
  let authProvider = undefined;

  if (jwt === null) {
    return (
      <div className='login-container content'>
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
