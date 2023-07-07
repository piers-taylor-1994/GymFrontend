import { Logout } from "./auth/Auth";
import HistoryRoutes from "./history/Routes";
import Homepage from "./homepage/Homepage";
import LeaderboardRoutes from "./leaderboard/Routes";
import RoutinesRoutes from "./routine/Routes";
import Settings from "./settings/Settings";
import Stopwatch from "./stopwatch/Stopwatch";
import WorkoutsRoutes from "./workouts/Routes";

const ROUTES = [
    {
        path: "",
        element: <Homepage />,
        children: []
    },
    {
        path: "/stopwatch",
        element: <Stopwatch />,
        children: [] 
    },
    WorkoutsRoutes,
    RoutinesRoutes,
    HistoryRoutes,
    LeaderboardRoutes,
    {
        path: "/settings",
        element: <Settings />,
        children: []
    },
    {
        path: "/logout",
        element: <Logout />,
        children: []
    },
    {
        path: "*",
        element: <h1>Page doesn't exist</h1>,
        children: []
    }
]

export default ROUTES;