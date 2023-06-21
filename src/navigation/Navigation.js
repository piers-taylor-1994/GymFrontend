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
            <Link className="nav-item" to={publicUrlAppender("/workouts")}>Workouts</Link>
            <Link className="nav-item" to={publicUrlAppender("/routine")}>Routine</Link>
            <Link className="nav-item" to={publicUrlAppender("/history")}>History</Link>
            <Link className="nav-item" to={publicUrlAppender("/tutorials")}>Tutorials</Link>
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