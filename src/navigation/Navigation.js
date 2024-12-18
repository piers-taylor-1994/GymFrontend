import { Link, useLocation } from "react-router-dom";
import "./navigation.scss";
import * as Icon from '../layout/Icons';
import { useContext } from "react";
import { AuthContext } from "../auth/Auth";

function TopNav(props) {
    const location = useLocation();
    const authContext = useContext(AuthContext);
    const userId = authContext.user().sub;

    const userQRShow = () => {
        return userId === "c1fef7f5-383b-4200-b498-c201a6ac1fec" || userId === "dfc8413d-69cd-468d-8ba5-e8fcca566bf1" || userId === "318ca921-ec0b-4ab6-a6b8-dda4b1e1d769" ? true : false;
    } 

    return (
        <div className="navigation-top" >
            <div className="navigation-top-right">
                {location.pathname !== "/" ? <Link className="nav-item" to={"/"}><Icon.Home /></Link> : userQRShow() ? <Link className="nav-item" to={"/qrcode"}><Icon.QrCode /></Link> : userId === "9f15fa88-844e-480c-9440-c7290ee31115" ? <Link className="nav-item" to={"/booking"}><Icon.Book /></Link> : <></>}
                <Link className="nav-item" to={"/settings"}><Icon.Settings /></Link>
            </div>
        </div>
    )
}

function BottomNav(props) {
    return (
        <div className="navigation-bottom">
            <Link className="nav-item" to={"/workouts"}>
                <div className="nav-item-container">
                    <Icon.Workouts />
                    <span>Workouts</span>
                </div>
            </Link>
            <Link className="nav-item" to={"/routine"}>
                <div className="nav-item-container">
                    <Icon.Routine />
                    <span>Routine</span>
                </div>
            </Link>
            <Link className="nav-item" to={"/history"}>
                <div className="nav-item-container">
                    <Icon.History />
                    <span>History</span>
                </div>
            </Link>
            <Link className="nav-item" to={"/leaderboard"}>
                <div className="nav-item-container">
                    <Icon.Leaderboard />
                    <span>Leaderboard</span>
                </div>
            </Link>
        </div>
    )
}

function Navigation(props) {
    return (
        <>
            <TopNav />
            <BottomNav />
        </>
    )
}

export { Navigation };