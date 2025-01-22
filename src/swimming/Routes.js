import { Outlet } from "react-router-dom";
import { Swimming, SwimmingAdd } from "./Swimming";

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
        }
    ]
}

export default SwimmingRoutes;