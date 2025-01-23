import { Outlet } from "react-router-dom";
import { Swimming, SwimmingAdd, SwimmingDelete } from "./Swimming";

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
        }
    ]
}

export default SwimmingRoutes;