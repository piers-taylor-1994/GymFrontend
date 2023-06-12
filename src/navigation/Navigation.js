import { Link } from "react-router-dom";
import "./navigation.scss";

function TopNav(props) {
    return (
        <div className="navigation-top">
        </div>
    )
}

function BottomNav(props) {
    return (
        <div className="navigation-bottom">
            <div className="nav-item"><Link to={"/workouts"}>Workouts</Link></div>
            <div className="nav-item"><Link to={"/workouts/routine"}>Routine</Link></div>
            <div className="nav-item"><Link to={"/tutorials"}>Tutorials</Link></div>
            <div className="nav-item"><Link to={"/leaderboards"}>Leaderboards</Link></div>
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

export default Navigation;