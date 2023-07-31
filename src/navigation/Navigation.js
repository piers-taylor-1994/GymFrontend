import { Link, useLocation } from "react-router-dom";
import "./navigation.scss";
import * as Icon from '../layout/Icons';

function TopNav(props) {
    const location = useLocation();

    return (
        <div className="navigation-top">
            {location.pathname !== "/" ? <Link className="nav-item" to={"/"}><Icon.Home /></Link> : <></>}
            <Link className="nav-item" to={"/settings"}><Icon.Settings /></Link>
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