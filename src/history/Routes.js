import { Outlet } from "react-router-dom";
import WorkoutsHistory from "./History";
import { publicUrlAppender } from "../navigation/Navigation";

const HistoryRoutes = {
    path: publicUrlAppender("/history"),
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