import { Outlet } from "react-router-dom";
import Routine from "./Routine";
import WorkoutsHistory from "../history/History";

const RoutinesRoutes = {
    path: "routine",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <Routine />,
            children: []
        },
        {
            path: "history",
            element: <WorkoutsHistory />,
            children: []
        },
    ]
}

export default RoutinesRoutes;