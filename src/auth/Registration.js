import { useState } from "react";
import { LoaderButton } from "../layout/Layout";

function Registration() {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[showError, setShowError] = useState(false);
    const[loading, setLoading] = useState(false);

    const error = showError ? <span className="warning">Error</span> : <></>;
    const test = "";

    return (
        <form className="registration content">
            <h1>Registration</h1>
            <label>
                Username
                <input id="username" autoCapitalize="none" minLength={5} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password
                <input id="password" type="password" autoCapitalize="none" minLength={8} pattern="/[A-Z]/" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                Confirm password
                <input id="confirmPassword" type="password" autoCapitalize="none" minLength={8} pattern="/[A-Z]/" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <LoaderButton show={loading} submit={null}>Login</LoaderButton>
            {error}
        </form>
    )
}

export default Registration;