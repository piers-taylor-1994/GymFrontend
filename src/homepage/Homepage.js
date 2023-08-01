import { useContext, useEffect, useState } from "react";
import { GetWorkoutsCount } from "./Data";
import { AuthContext } from "../auth/Auth";
import "./homepage.scss";
import { Loader } from "../layout/Layout";
import * as Icon from "../layout/Icons";

function Homepage(props) {
    const [counts, setCounts] = useState({});
    const [loading, setLoading] = useState(true);
    
    let authContext = useContext(AuthContext);
    let user = authContext.user();

    useEffect(() => {
        GetWorkoutsCount().then((c) => {
            setLoading(false);
            setCounts(c);
        })
    }, [])

    let weekDifference = counts.weekCount > counts.lastWeekCount
        ? <span className="count2 difference-show" style={{ color: "green" }}>(&#43;{counts.weekCount - counts.lastWeekCount}<Icon.UpStonks />)</span>
        : counts.weekCount === counts.lastWeekCount ? <span className="count2 difference-show" style={{ color: "grey" }}>(=)</span>
            : <span className="count2 difference-show" style={{ color: "red" }}>({counts.weekCount - counts.lastWeekCount}<Icon.DownStonks />)</span>;

    let monthDifference = counts.monthCount > counts.lastMonthCount
        ? <span className="count1 difference-show" style={{ color: "green" }}>(&#43;{counts.monthCount - counts.lastMonthCount}<Icon.UpStonks />)</span>
        : counts.monthCount === counts.lastMonthCount ? <span className="count1 difference-show" style={{ color: "grey" }}>(=)</span>
            : <span className="count1 difference-show" style={{ color: "red" }}>({counts.monthCount - counts.lastMonthCount}<Icon.DownStonks />)</span>;


    const display = loading
        ? <Loader />
        : <>
            <h1 id="header1">Welcome</h1>
            <div className="subheaders-container">
                <div className="subheader-container">
                    <span className="subheader" id="header2">This month's streak: </span>
                    <div className="difference-container">
                        <span className="subheader count count1">{counts.monthCount}</span>
                        {monthDifference}
                    </div>
                </div>
                <div className="subheader-container">
                    <span className="subheader" id="header3">This week's streak:</span>
                    <div className="difference-container">
                        <span className="subheader count count2">{counts.weekCount}</span>
                        {weekDifference}
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