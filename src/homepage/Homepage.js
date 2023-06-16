import { useContext } from "react"
import { AuthContext } from "../auth/Auth"

function Homepage(props) {
    const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const d = new Date();

    const authContext = useContext(AuthContext);
    const user = authContext.user();
    console.log(user);

    return (
        <div className="homepage">
            <h1>{dayOfWeek[d.getDay()]}</h1>
        </div>
    )
}

export default Homepage;