import { createContext, useState } from "react";
import { Logon } from "./Data";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import './auth.scss';
import { LoaderButton } from "../layout/Layout";

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
    if (navigator.serviceWorker.controller !== null) {
        navigator.serviceWorker.controller.postMessage({
            type: 'STORE-TOKEN',
            token: jwt
        });
    }
    
    
}

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logoPath = "/icons/logo512.png";

    const onSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        Logon(username, password).then(r => {
            if (r === undefined) {
                setShowError(true);
            }
            else {
                SetAuthContext(r);
                navigate(0);
            }
            setLoading(false);
        })
    }

    const error = showError ? <span className="warning">Your credentials are wrong, please try again</span> : <><br /><br /></>;

    return (
        <div className="login">
            <div className="logo-container">
                <img fetchpriority="high" src={logoPath} alt="app logo"/>
            </div>
            <form className="login-form">
            <label>
                Username
                <input id="username" autoCapitalize="none" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password
                <input id="password" type="password" autoCapitalize="none" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <LoaderButton show={loading} submit={onSubmit}>Login</LoaderButton>
            {error}
            {/* <div className="create-container" onClick={() => console.log("Test")}>
                <span>Create a new account</span>
            </div> */}
        </form>
        </div>
    )
}

function Logout(props) {
    localStorage.removeItem("jwt");
    if (navigator.serviceWorker.controller !== null) {
        navigator.serviceWorker.controller.postMessage({
            type: 'CLEAR-TOKEN'
        });
    }
    window.history.replaceState('', '', '/'); //dirty vanilla JS hack as useNavigate is inconsistent
}

export { AuthContext, BuildContext, SetAuthContext, Login, Logout };