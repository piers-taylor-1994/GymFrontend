import { Format } from "../layout/dates";


function Homepage(props) {
    return (
        <div>
            <div className="homepage content">
                <h1>{Format(new Date()).day}</h1>
            </div>
        </div>
    )
}

export default Homepage;