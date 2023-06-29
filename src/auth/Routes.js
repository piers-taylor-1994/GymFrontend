import { Login } from "./Auth";
import Registration from "./Registration";

const ANONROUTES = [
    {
        path: "/",
        element: <Login />,
        children: []
    },
    {
        path: "/register",
        element: <Registration />,
        children: []
    },
    {
        path: "*",
        element: <Login />,
        children: []
    }
]

export default ANONROUTES;