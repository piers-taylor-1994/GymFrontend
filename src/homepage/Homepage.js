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

    let weekStyle = counts.weekCount > counts.lastWeekCount ? { color: "green" } : counts.weekCount === counts.lastWeekCount ? { color: "grey" } : { color: "red" };
    let monthStyle = counts.monthCount > counts.lastMonthCount ? { color: "green" } : counts.monthCount === counts.lastMonthCount ? { color: "grey" } : { color: "red" };
    let weekIcon = counts.weekCount > counts.lastWeekCount ? <Icon.UpStonks /> : counts.weekCount === counts.lastWeekCount ? <></> : <Icon.DownStonks />;
    let monthIcon = counts.monthCount > counts.lastMonthCount ? <Icon.UpStonks />  : counts.monthCount === counts.lastMonthCount ? <></> : <Icon.DownStonks />;

    const display = loading
        ? <Loader />
        : <>
            <h1 id="header1">Welcome back {user.username}</h1>
            <span className="subheader" id="header2">This month's streak: <span id="count1" style={monthStyle}>{counts.monthCount}{monthIcon}</span></span>
            <span className="subheader" id="header3">This week's streak: <span id="count2" style={weekStyle}>{counts.weekCount}{weekIcon}</span></span>
        </>

    return (
        <div>
            <div className="homepage content">
                {display}
            </div>
        </div>
    )
}

export default Homepage;