import { useContext } from "react"
import { AuthContext } from "../auth/Auth"
import { Format } from "../dates";

function Homepage(props) {
    const authContext = useContext(AuthContext);
    const user = authContext.user();
    console.log(user);

    return (
        <div className="homepage">
            <h1>{Format(new Date()).day}</h1>
        </div>
    )
}

export default Homepage;