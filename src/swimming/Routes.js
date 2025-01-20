import { Outlet } from "react-router-dom";
import { Swimming } from "./Swimming";

const SwimmingRoutes = {
    path: "/swimming",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <Swimming />,
            children: []
        }
    ]
}

export default SwimmingRoutes;