import { Logout } from "./auth/Auth";
import HistoryRoutes from "./history/Routes";
import Homepage from "./homepage/Homepage";
import { publicUrlAppender } from "./navigation/Navigation";
import RoutinesRoutes from "./routine/Routes";
import Settings from "./settings/Settings";
import Stopwatch from "./stopwatch/Stopwatch";
import WorkoutsRoutes from "./workouts/Routes";

const ROUTES = [
    {
        path: publicUrlAppender(""),
        element: <Homepage />,
        children: []
    },
    {
        path: publicUrlAppender("/stopwatch"),
        element: <Stopwatch />,
        children: [] 
    },
    WorkoutsRoutes,
    RoutinesRoutes,
    HistoryRoutes,
    {
        path: publicUrlAppender("/settings"),
        element: <Settings />,
        children: []
    },
    {
        path: publicUrlAppender("/logout"),
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