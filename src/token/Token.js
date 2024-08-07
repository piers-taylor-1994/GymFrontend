import { useContext, useEffect, useState } from "react";
import { SetToken } from "./Data";
import "./token.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import { LoaderButton } from "../layout/Layout";

function Token() {
    const [token, setToken] = useState("");
    const [showLoaderbutton, setShowLoaderButton] = useState(false);
    const [response, setResponse] = useState("");
    const authContext = useContext(AuthContext);
    const userId = authContext.user().sub;
    const navigate = useNavigate();

    useEffect(() => {
        if (userId !== "c1fef7f5-383b-4200-b498-c201a6ac1fec") navigate("/");
    }, [userId, navigate])


    const onSubmit = () => {
        setShowLoaderButton(true);
        SetToken(token).then((r) => {
            console.log(r);
            setResponse(r);
            setShowLoaderButton(false);
        })
    }

    return (
        <div className="token content">
            <h1 id="header1">Token updater</h1>
            <div className="input-container">
                <input onChange={(e) => setToken(e.target.value)}/>
                <LoaderButton submit={onSubmit} show={showLoaderbutton}>Submit</LoaderButton>
            </div>
            <div className="response-container">{response}</div>
        </div>
    )
}

export default Token;