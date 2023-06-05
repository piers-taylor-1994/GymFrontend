import { useState } from "react";
import { Logon } from "./Data";
import { useNavigate } from "react-router-dom";

function SetAuthContext(token) {
    localStorage.setItem("token", token);
}

function Login(props) {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate();

    const onSubmit = (username, password) => {
        Logon(username, password).then(r => {
            if (!r) {
                setUsername("");
                setPassword("");
            }
            else {
                SetAuthContext(r);
                navigate(0);
            }
        })
    }

    return (
        <div>
            <div>
                <label>
                    Username
                    <input id="username" onChange={(e) => setUsername(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    Password
                    <input id="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
            </div>
            <button type="submit" onClick={() => onSubmit(username, password)}>Submit</button>
        </div>
    )
}

export { Login };