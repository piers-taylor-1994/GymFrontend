import { Link } from "react-router-dom";
import "./navigation.scss";
import * as Icon from '../layout/Icons';

function TopNav(props) {
    return (
        <div className="navigation-top">
            <Link className="nav-item" to={"/settings"}><Icon.Settings /></Link>
        </div>
    )
}

function BottomNav(props) {
    return (
        <div className="navigation-bottom">
            <Link className="nav-item" to={"/workouts"}>Workouts</Link>
            <Link className="nav-item" to={"/routine"}>Routine</Link>
            <Link className="nav-item" to={"/history"}>History</Link>
            <Link className="nav-item" to={"/tutorials"}>Tutorials</Link>
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