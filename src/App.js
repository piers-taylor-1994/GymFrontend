import './App.scss';
import { useRoutes } from 'react-router-dom';
import ANONROUTES from './auth/Routes';
import { AuthContext, BuildContext } from './auth/Auth';
import ROUTES from './Routes';
import { Navigation } from './navigation/Navigation';
import './layout/components/themes.scss'
import Patch from './patch/Patch';

function App() {
  const router = useRoutes(ROUTES);
  const anonRouter = useRoutes(ANONROUTES);

  const theme = localStorage.getItem("theme");
  const jwt = localStorage.getItem("jwt");
  let authProvider = undefined;

  if (jwt === null) {
    if (theme !== null) {
      document.documentElement.className = theme;
    } else {
      document.documentElement.className = "light";
    }
    return (
      <div className='app'>
        <div className='login-container content'>
          {anonRouter}
        </div>
      </div>
    )
  }

  authProvider = BuildContext(jwt);

  if (theme !== null) {
    document.documentElement.className = theme;
  } else {
    const newTheme = "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  }

  return (
    <div className="app">
        <AuthContext.Provider value={authProvider}>
          <Navigation />
          <Patch />
          {router}
        </AuthContext.Provider>
    </div>
  );
}

export default App;
