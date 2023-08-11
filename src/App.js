import './App.scss';
import { useRoutes } from 'react-router-dom';
import ANONROUTES from './auth/Routes';
import { AuthContext, BuildContext } from './auth/Auth';
import ROUTES from './Routes';
import { Navigation } from './navigation/Navigation';
import './layout/components/themes.scss'
import Patch from './patch/Patch';
import { useEffect, useState } from 'react';

function App() {
  const router = useRoutes(ROUTES);
  const anonRouter = useRoutes(ANONROUTES);
  const [online, setOnline] = useState(navigator.onLine);

  const theme = localStorage.getItem("theme");
  const jwt = localStorage.getItem("jwt");
  let authProvider = undefined;

  useEffect(() => {
    window.addEventListener("online", () => setOnline(true));
    window.addEventListener("offline", () => setOnline(false));
  }, []);

  if (!online) return (
    <div className='app'>
      <div className='content'>
        <h1>You are offline</h1>
        <span>The app will automatically connect to the server once you have a stable internet connection again.</span>
      </div>
    </div>
  )

  if (jwt === null) {
    if (theme !== null) {
      document.documentElement.className = theme;
    } else {
      document.documentElement.className = "dark";
    }
    return (
      <div className='app'>
        {anonRouter}
      </div>
    )
  }

  authProvider = BuildContext(jwt);

  if (theme !== null) {
    document.documentElement.className = theme;
  } else {
    const newTheme = "dark";
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
