import { Logout } from "./auth/Auth";
import Homepage from "./homepage/Homepage";
import Stopwatch from "./stopwatch/Stopwatch";

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
        path: "/logout",
        element: <Logout />,
        children: []
    }
]

export default ROUTES;