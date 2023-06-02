import { useEffect, useState } from 'react';
import './App.css';
import { GetUsers, GetUser } from './Data';

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    GetUser().then(user => {
      setUser(user);
    })
    GetUsers().then(users => {
      setUsers(users);
    })
  }, [])

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
        <h1>{user.id}</h1>
        {usersDisplay}
      </header>
    </div>
  );
}

export default App;
