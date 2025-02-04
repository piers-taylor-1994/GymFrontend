import { Outlet } from "react-router-dom";
import { Swimming, SwimmingAdd, SwimmingDelete } from "./Swimming";
import { HistoryType, WorkoutsHistory } from "../history/History";
import Settings from "../settings/Settings";

const SwimmingRoutes = {
    path: "/swimming",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <Swimming />,
        },
        {
            path: "add",
            element: <SwimmingAdd />,
        },
        {
            path: "delete",
            element: <SwimmingDelete />,
        },
        {
            path: "history",
            element: <WorkoutsHistory historyType={HistoryType.Swimming} />,
            children: [
                {
                    path: ":id",
                    element: <WorkoutsHistory historyType={HistoryType.Workouts}/>
                },
            ]
        },
        {
            path: "settings",
            element: <Settings />
        }
    ]
}

export default SwimmingRoutes;