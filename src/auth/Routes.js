import { Login } from "./Auth";

const ANONROUTES = [
    {
        path: "/",
        element: <Login />,
        children: []
    },
    {
        path: "*",
        element: <Login />,
        children: []
    }
]

export default ANONROUTES;