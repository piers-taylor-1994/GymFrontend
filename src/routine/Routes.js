import { Outlet } from "react-router-dom";
import Routine from "./Routine";

const RoutinesRoutes = {
    path: "/routine",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <Routine />,
            children: []
        }
    ]
}

export default RoutinesRoutes;