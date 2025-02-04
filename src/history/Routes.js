import { Outlet } from "react-router-dom";
import { HistoryType, WorkoutsHistory } from "./History";

const HistoryRoutes = {
    path: "/history",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <WorkoutsHistory historyType={HistoryType.Workouts}/>,
            children: []
        },
        {
            path: ":id",
            element: <WorkoutsHistory historyType={HistoryType.Workouts}/>,
            children: []
        },
        {
            path: "ghost",
            element: <WorkoutsHistory historyType={HistoryType.Ghost}/>,
            children: []
        }
    ]
}

export default HistoryRoutes;