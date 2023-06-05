import { useEffect, useState } from 'react';
import './App.css';
import { GetUsers } from './Data';
import { useRoutes } from 'react-router-dom';
import ANONROUTES from './auth/Routes';

function App() {
  const [users, setUsers] = useState([]);
  const anonRouter = useRoutes(ANONROUTES);

  const token = localStorage.getItem("token");

  useEffect(() => {
    GetUsers().then(users => {
      setUsers(users);
    })
  }, [])

  if (token === null) {
    return (
      <div className='app'>
        {anonRouter}
      </div>
    )
  }



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
      <header className="App-header">
        <h1>Home page</h1>
        {usersDisplay}
      </header>
    </div>
  );
}

export default App;
