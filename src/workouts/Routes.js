import { Outlet } from "react-router-dom";
import { Workouts } from "./Workouts";
import { publicUrlAppender } from "../navigation/Navigation";

const WorkoutsRoutes = {
    path: publicUrlAppender("/workouts"),
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