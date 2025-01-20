import { Logout } from "./auth/Auth";
import Booking from "./booking/Booking";
import HistoryRoutes from "./history/Routes";
import Homepage from "./homepage/Homepage";
import LeaderboardRoutes from "./leaderboard/Routes";
import Qrcode from "./qrcode/Qrcode";
import RoutinesRoutes from "./routine/Routes";
import Settings from "./settings/Settings";
import Stopwatch from "./stopwatch/Stopwatch";
import SwimmingRoutes from "./swimming/Routes";
import Token from "./token/Token";
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
    SwimmingRoutes,
    {
        path: "/settings",
        element: <Settings />,
        children: []
    },
    {
        path: "/qrcode",
        element: <Qrcode />,
        children: []
    },
    {
        path: "/booking",
        element: <Booking />,
        children: []
    },
    {
        path: "/token",
        element: <Token />,
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