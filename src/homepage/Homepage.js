import { useNavigate } from "react-router-dom";
import { Format } from "../layout/dates";
import { useEffect } from "react";

function Homepage(props) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/workouts");
    }, [navigate])
    return (
        <div className="homepage content">
            <h1>{Format(new Date()).day}</h1>
        </div>
    )
}

export default Homepage;