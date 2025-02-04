import { useEffect, useState } from "react";
import "./swimming.scss";
import { AddSwim, GetRecentSwims, GetSwimCount, GetTodaysSwim } from "./Data";
import { useNavigate } from "react-router-dom";
import { Format } from "../layout/dates";
import { LoaderButton } from "../layout/Layout";

function Swimming() {
    const [count, setCount] = useState({});
    const [recent, setRecent] = useState([]);

    useEffect(() => {
        GetSwimCount().then((result) => {
            setCount(result);
        })
        GetRecentSwims().then((result) => {
            setRecent(result);
            console.log(result);
        })
    }, [])

    const toRow = (r) => {
        return (
            <tr className="tableRow" key={r.id}>
                <th>{Format(r.date).daySmallMonth}</th>
                <th>{r.lengths} Lengths</th>
                <th>{r.timeSwimming} Minutes</th>
            </tr>
        )
    }

    const rows = recent.map((r) => toRow(r));

    return (
        <div className="swimming content">
            <p className="welcome">Welcome to:</p>
            <h1 className="title">Swimming ~~\o/~~</h1>  {/* Maybe swim icon if we find one */}
            <div className="textdivs">
                <p className="timeswam">Times swam this week: </p>
                <p className="answers"> {count.weekCount}</p>
            </div>
            <div className="content-container">
            <div className="textdivs">
                <p className="timeswam">Times swam this month: </p>{/*Possibly tally up total lengths or distance swum within those two time paramaters. */}
                <p className="answers"> {count.monthCount}</p>
            </div>

            {/* <div className="textdivs">
            <p>Fastest previous swim: </p>
            <p className="answers"> 2.4 Lengths per min.</p>
            </div>
            <div className="textdivs">
            <p>Longest ever swim: </p>
            <p className="answers"> 62 Lengths.</p>
            </div>Medal icons for both. */}
            
            <h2>Recent swims</h2>
            </div>
            {recent.length > 0 
            ? <table id="table">
            <tbody>
                <tr>
                    <th>Date</th>
                    <th>Lengths</th>
                    <th>Time</th>
                </tr>
                {rows}
            </tbody>
        </table>
            : <></>}
            
            

            {/* <div className="textdivs">
            <p>Average minutes per recent swims: </p>
            <p className="answers"> 35.</p>
            </div>
            <div className="textdivs">
            <p>Average lengths completed recently: </p>
            <p className="answers"> 39.</p>
            </div> */}

        </div>
    )
}

function SwimmingAdd() {
    const [time, setTime] = useState(null);
    const [length, setLength] = useState(null);
    const [review, setReview] = useState(null);
    const [explanation, setExplanation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        GetTodaysSwim().then((result) => {
            console.log(result);
            if(result !== undefined) {
                setTime(result.timeSwimming);
                setLength(result.lengths);
                setReview(result.review);
                setExplanation(result.explanation);
            }
        })
    }, [])

    const onSubmit = () => {
        setLoading(true);
        if(time <= 0 || length <= 0 || review === null) {
            setError(true);
            setLoading(false);
        }
        else{
        AddSwim(time, length, review, explanation).then((result) => {
            setLoading(false);
            navigate("/swimming/history/" + result.id);
        })
        }
    }
    

    return (
        <div className="swimming content">
            <h1>Add a new swim:</h1>
            <label>How long were you swimming for?
                <input type="number" defaultValue={time} placeholder="30" onChange={(e) => setTime(e.target.value)}></input> Minutes
            </label>
            <br />
            <br />
            <label>How many lengths did you complete?
                <input type="number" defaultValue={length} placeholder="25" onChange={(e) => setLength(e.target.value)}></input> Lengths
            </label>
            <br />
            <br />
            <label>How did you find the swim?
                <br />
                <form className="radiobuttons">
                <label className="radiolabels" for="radio1">
                <input type="radio" id="radio1" name="reviewRadio" value={1}  onChange={(e) => setReview(e.target.value)}/>Good
                </label>
                <label className="radiolabels" for="radio0">
                <input type="radio" id="radio0" name="reviewRadio" value={0}  onChange={(e) => setReview(e.target.value)}/>Average
                </label>
                <label className="radiolabels" for="radio2">
                <input type="radio" id="radio2" name="reviewRadio" value={2}  onChange={(e) => setReview(e.target.value)}/>Bad
                </label>
                </form>
                {/* <button value={true} onClick={(e) => setReview(e.target.value)}>Good</button>
                <button value={false} onClick={(e) => setReview(e.target.value)}>Bad</button> */}
            </label>
            <br />
            <br />
            <label>Optional: Add an explanation of why you think the swim was good/bad:
                <br /><div >
                <textarea type="text" size="50"  id="commentbox" defaultValue={explanation} placeholder="Any comments about the swim..." onChange={(e) => setExplanation(e.target.value)}></textarea>
                </div>
            </label>
            <br />
            <br />
            <div className="button-container submit-container">
           { error ? <span className="warning">Please fill in all necessary fields then resubmit</span> : <></> }
                {/* <button className="button" type="submit" onClick={onSubmit}>Submit Swim</button> */}
                <LoaderButton buttonStyle="button-s" show={loading} submit={onSubmit}>Submit</LoaderButton>
            </div>
        </div>
    )
}



function SwimmingDelete() {

    return (
        <div className="swimming content">
            <h1>Delete a previous swim</h1>
            <br />
            <br />
            <div>
                <ul>
                    <li><input type="radio" value="delete"></input>04/01/25 - Lengths: 20 - Time: 30</li>
                    <li><input type="radio" value="delete"></input>03/01/25 - Lengths: 25 - Time: 25</li>
                    <li><input type="radio" value="delete"></input>02/01/25 - Lengths: 40 - Time: 38</li>
                    <li><input type="radio" value="delete"></input>01/01/25 - Lengths: 12 - Time: 22</li>
                    <li><input type="radio" value="delete"></input>04/01/25 - Lengths: 20 - Time: 30</li>
                    <li><input type="radio" value="delete"></input>03/01/25 - Lengths: 25 - Time: 25</li>
                    <li><input type="radio" value="delete"></input>02/01/25 - Lengths: 40 - Time: 38</li>
                    <li><input type="radio" value="delete"></input>01/01/25 - Lengths: 12 - Time: 22</li>
                </ul>
            </div>
            <br />
            <br />
            <button className="button" type="submit">Delete Selected</button>
        </div>
    )
}

export { Swimming, SwimmingAdd, SwimmingDelete };