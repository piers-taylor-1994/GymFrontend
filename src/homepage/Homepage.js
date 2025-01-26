import { useContext, useEffect, useState } from "react";
import { GetMostRecentWorkouts, GetWorkoutsCount } from "./Data";
import { AuthContext } from "../auth/Auth";
import "./homepage.scss";
import { Loader } from "../layout/Layout";
import * as Icon from "../layout/Icons";
import { Format } from "../layout/dates";

const MuscleArea = {
    0: "Uppers",
    1: "Core",
    2: "Legs",
}
Object.freeze(MuscleArea);

function Homepage(props) {
    const [counts, setCounts] = useState({});
    const [recentWorkouts, setRecentWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    let authContext = useContext(AuthContext);

    useEffect(() => {
        if (authContext.jwt()) {
            GetWorkoutsCount().then((c) => {
                setCounts(c);
            })
            GetMostRecentWorkouts().then((w) => {
                setRecentWorkouts(w);
                setLoading(false);
            })
        }
    }, [authContext])

    const toRow = (rw, i) => {
        return (
            <div id={"row" + i} className="row" key={i}>
                <p>{Format(rw.date).date} {Format(rw.date).time}</p>
                <p>{rw.username}</p>
                <p>{MuscleArea[rw.muscleArea]}</p>
            </div>
        )
    }

    let weekDifference = counts.weekCount > counts.lastWeekCount
        ? <span className="count2 difference" style={{ color: "green" }}>(&#43;{counts.weekCount - counts.lastWeekCount}<Icon.UpStonks />)</span>
        : counts.weekCount === counts.lastWeekCount ? <span className="count2 difference" style={{ color: "grey" }}>(=)</span>
            : <span className="count2 difference" style={{ color: "red" }}>({counts.weekCount - counts.lastWeekCount}<Icon.DownStonks />)</span>;

    let monthDifference = counts.monthCount > counts.lastMonthCount
        ? <span className="count1 difference" style={{ color: "green" }}>(&#43;{counts.monthCount - counts.lastMonthCount}<Icon.UpStonks />)</span>
        : counts.monthCount === counts.lastMonthCount ? <span className="count1 difference" style={{ color: "grey" }}>(=)</span>
            : <span className="count1 difference" style={{ color: "red" }}>({counts.monthCount - counts.lastMonthCount}<Icon.DownStonks />)</span>;


    let recentWorkoutsDisplay = recentWorkouts.map((rw, i) => toRow(rw, i));


    const display = loading
        ? <Loader />
        : <>
            <h1 id="header1">Welcome</h1>
            <div className="content-container">
                <div className="subheaders-container">
                    <div className="subheader-container">
                        <span className="subheader" id="header2">This month's streak: </span>
                        <div className="difference-container">
                            <span className="subheader count1">{counts.monthCount}</span>
                            {monthDifference}
                        </div>
                    </div>
                    <div className="subheader-container">
                        <span className="subheader" id="header3">This week's streak:</span>
                        <div className="difference-container">
                            <span className="subheader count2">{counts.weekCount}</span>
                            {weekDifference}
                        </div>
                    </div>
                </div>
                <div className="recent-container">
                    <h2>Recent workouts</h2>
                    <div className="rows">
                        {recentWorkoutsDisplay}
                    </div>
                </div>
            </div>
        </>

    return (
        <div className="homepage content">
            {display}
        </div>
    )
}

export default Homepage;