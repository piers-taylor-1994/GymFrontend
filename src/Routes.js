import { Logout } from "./auth/Auth";
import Homepage from "./homepage/Homepage";
import Stopwatch from "./stopwatch/Stopwatch";
import WorkoutsRoutes from "./workouts/Routes";

const ROUTES = [
    {
        path: "/",
        element: <Homepage />,
        children: []
    },
    {
        path: "/stopwatch",
        element: <Stopwatch />,
        children: [] 
    },
    WorkoutsRoutes,
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