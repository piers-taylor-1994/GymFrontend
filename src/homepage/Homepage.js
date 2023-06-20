import { Format } from "../dates";

function Homepage(props) {
    return (
        <div className="homepage">
            <h1>{Format(new Date()).day}</h1>
        </div>
    )
}

export default Homepage;