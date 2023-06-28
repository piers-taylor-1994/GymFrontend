import { Outlet } from "react-router-dom";
import { Workouts } from "./Workouts";
const WorkoutsRoutes = {
    path: "/workouts",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <Workouts />,
            children: []
        }
    ]
}

export default WorkoutsRoutes;