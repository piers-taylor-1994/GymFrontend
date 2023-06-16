import { Outlet } from "react-router-dom";
import Routine from "./Routine";
import { publicUrlAppender } from "../navigation/Navigation";

const RoutinesRoutes = {
    path: publicUrlAppender("/routine"),
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