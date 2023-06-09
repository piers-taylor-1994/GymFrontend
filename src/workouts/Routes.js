import { Outlet } from "react-router-dom";
import RoutinesRoutes from "./routine/Routes";
import { Workouts } from "./Workouts";

const WorkoutsRoutes = {
    path: "workouts",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <Workouts />,
            children: []
        },
        RoutinesRoutes
    ]
}

export default WorkoutsRoutes;