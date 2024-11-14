import { Outlet } from "react-router-dom";
import WorkoutsHistory from "./History";

const HistoryRoutes = {
    path: "/history",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <WorkoutsHistory ghost={false}/>,
            children: []
        },
        {
            path: ":id",
            element: <WorkoutsHistory ghost={false}/>,
            children: []
        },
        {
            path: "ghost",
            element: <WorkoutsHistory ghost={true}/>,
            children: []
        }
    ]
}

export default HistoryRoutes;