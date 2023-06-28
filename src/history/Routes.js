import { Outlet } from "react-router-dom";
import WorkoutsHistory from "./History";

const HistoryRoutes = {
    path: "/history",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <WorkoutsHistory />,
            children: []
        },
        {
            path: ":id",
            element: <WorkoutsHistory />,
            children: []
        }
    ]
}

export default HistoryRoutes;