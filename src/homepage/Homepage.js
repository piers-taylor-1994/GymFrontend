import { useContext } from "react"
import { AuthContext } from "../auth/Auth"

function Homepage(props) {
    const authContext = useContext(AuthContext);
    const user = authContext.user();
    const name = user.name;

    console.log(user);

    return (
        <div>
            <h1>Welcome {name.firstName} {name.lastName}</h1>
        </div>
    )
}

export default Homepage;