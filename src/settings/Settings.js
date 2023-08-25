import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './settings.scss'
import { AuthContext } from "../auth/Auth";

function Theme() {
    let storedTheme = localStorage.getItem("theme");
    if (storedTheme === null) storedTheme = "light";

    const [theme, setTheme] = useState(storedTheme);

    var themeChange = (e) => {
        setTheme(e.target.value);
        localStorage.setItem("theme", e.target.value);
        document.documentElement.className = e.target.value;
    }

    const checked = (value) => value === theme;

    return (
        <div className='theme-selection'>
            <h2>Colour mode</h2>
            <label><input name="theme" onChange={themeChange} checked={checked("light")} type="radio" value="light" />Light</label>
            <br />
            <label><input name="theme" onChange={themeChange} checked={checked("dark")} type="radio" value="dark" />Dark</label>
        </div>
    );
}

function Logout() {
    const navigate = useNavigate();

    return (
        <div className="logout button-container">
            <button className="button button-xs button-grey" onClick={() => navigate("/logout")}>Logout</button>
        </div>
    )
}

function Settings(props) {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const userId = authContext.user().sub;

    const userCheck = () => {
        return userId === "c1fef7f5-383b-4200-b498-c201a6ac1fec" || userId === "dfc8413d-69cd-468d-8ba5-e8fcca566bf1" ? true : false;
    }

    const qrPage = () => {
        localStorage.setItem("theme", "light");
        document.documentElement.className = "light";
        navigate("/qrcode");
    }

    const qrcodeButton = userCheck()
        ? <div className="button-container">
            <button className="button button-s" onClick={qrPage}>Qrcode generator</button>
        </div>
        : <></>;

    return (
        <div className="settings content">
            <h1>Settings</h1>
            <Theme />
            <div className="buttons-container">
                {qrcodeButton}
                <Logout />
            </div>
        </div>
    )
}

export default Settings