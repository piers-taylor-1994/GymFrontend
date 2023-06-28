import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './settings.scss'

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
            <button className="button" onClick={() => navigate("/logout")}>Logout</button>
        </div>
    )
}

function Settings(props) {
    return (
        <div className="settings content">
            <h1>Settings</h1>
            <Theme />
            <Logout />
        </div>
    )
}

export default Settings