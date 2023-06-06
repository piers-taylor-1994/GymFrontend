import { useEffect, useState } from 'react';
import './App.scss';
import { GetUsers } from './Data';
import { useRoutes } from 'react-router-dom';
import ANONROUTES from './auth/Routes';
import { AuthContext, BuildContext } from './auth/Auth';
import ROUTES from './Routes';

function App() {
  const [users, setUsers] = useState([]);
  const routes = useRoutes(ROUTES);
  const anonRouter = useRoutes(ANONROUTES);

  const jwt = localStorage.getItem("jwt");
  let authProvider = undefined;

  // useEffect(() => {
  //   GetUsers().then(users => {
  //     setUsers(users);
  //   })
  // }, [])

  if (jwt === null) {
    return (
      <div className='login-container'>
        {anonRouter}
      </div>
    )
  }

  authProvider = BuildContext(jwt);

  const row = (userData) => {
    return (
      <div key={userData.id}>
        <p>{userData.id}</p>
        <p>{userData.username}</p>
        <p>{userData.password}</p>
      </div>
    )
  }

  const usersDisplay = users.map(user => row(user));

  return (
    <div className="App">
      <AuthContext.Provider value={authProvider}>
        {routes}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
