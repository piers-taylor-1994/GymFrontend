import { Link } from "react-router-dom";
import "./navigation.scss";

const publicUrlAppender = (url) => {
    return process.env.PUBLIC_URL + url;
}

function TopNav(props) {
    return (
        <div className="navigation-top">
        </div>
    )
}

function BottomNav(props) {
    return (
        <div className="navigation-bottom">
            <div className="nav-item"><Link to={publicUrlAppender("/workouts")}>Workouts</Link></div>
            <div className="nav-item"><Link to={publicUrlAppender("/routine")}>Routine</Link></div>
            <div className="nav-item"><Link to={publicUrlAppender("/history")}>History</Link></div>
            <div className="nav-item"><Link to={publicUrlAppender("/tutorials")}>Tutorials</Link></div>
            <div className="nav-item"><Link to={publicUrlAppender("/leaderboards")}>Leaderboards</Link></div>
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

export { Navigation, publicUrlAppender };