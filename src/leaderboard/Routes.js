import { Outlet } from "react-router-dom";
import Leaderboard from "./Leaderboard";

const LeaderboardRoutes = {
    path: "/leaderboard",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <Leaderboard />,
            children: []
        }
    ]
}

export default LeaderboardRoutes;