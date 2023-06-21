import { createContext, useEffect, useState } from "react";
import { Logon } from "./Data";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import './auth.scss';

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
    sessionStorage.setItem("jwt", jwt);
}

function Login(props) {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[showError, setShowError] = useState(false);
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (e, username, password) => {
        setLoading(true);
        e.preventDefault();
        Logon(username, password).then(r => {
            setLoading(false);
            if (!r) {
                setShowError(true);
            }
            else {
                SetAuthContext(r);
                navigate(0);
            }
        })
    }

    const error = showError ? <span style={{color: "darkred"}}>Your credentials are wrong, please try again</span> : <></>;
    const buttonText = loading ? <div className="spinner">&nbsp;</div> : <span>Login</span>;

    return (
        <form className="login">
            <label>
                Username
                <input id="username" autoCapitalize="none" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password
                <input id="password" type="password" autoCapitalize="none" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit" className="button" onClick={(e) => onSubmit(e, username, password)}>{buttonText}</button>
            {error}
        </form>
    )
}

function Logout(props) {
    const navigate = useNavigate();
    sessionStorage.removeItem("jwt");

    useEffect(() => {
        navigate("/");
    }, [navigate])
}

export { AuthContext, BuildContext, Login, Logout };