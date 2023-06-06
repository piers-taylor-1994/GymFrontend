import { Logout } from "./auth/Auth";
import Homepage from "./homepage/Homepage";
import Stopwatch from "./stopwatch/Stopwatch";
import Workouts from "./workouts/Workouts";

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
    {
        path: "/workouts",
        element: <Workouts />,
        children: [] 
    },
    {
        path: "/logout",
        element: <Logout />,
        children: []
    }
]

export default ROUTES;