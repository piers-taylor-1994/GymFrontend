import { createContext, useEffect, useState } from "react";
import { Logon } from "./Data";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({
    user: () => {
        // return auth user
    },
    jwt: () => {
        // return jwt
    }
})

const BuildContext = (jwt) => {
    const authProvider = {
        user: () => {
            var token = jwtDecode(jwt);

            token.name = JSON.parse(token.name);

            return token;
        },
        jwt: () => {
            return jwt;
        }
    }

    return authProvider;
}

function SetAuthContext(jwt) {
    localStorage.setItem("jwt", jwt);
}

function Login(props) {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate();

    const onSubmit = (e, username, password) => {
        e.preventDefault();
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
        <form className="login">
            <label>
                Username
                <input id="username" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password
                <input id="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={(e) => onSubmit(e, username, password)}>Submit</button>
        </form>
    )
}

function Logout(props) {
    const navigate = useNavigate();
    localStorage.removeItem("jwt");

    useEffect(() => {
        navigate("/");
    }, [navigate])
}

export { AuthContext, BuildContext, Login, Logout };