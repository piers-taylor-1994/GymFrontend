import "./swimming.scss";

function Swimming() {
    return (
        <div className="swimming content">
            <p class="welcome">Welcome to:</p>
            <h1 class="title">Swimming ~~\o/~~</h1>  {/* Maybe swim icon if we find one */}
             <div class="textdivs">
            <p>Times swam this week: </p>
            <p class="answers"> 3</p>
            </div>
            <div class="textdivs">
            <p>Times swam this month: </p>{/*Possibly tally up total lengths or distance swum within those two time paramaters. */ }
            <p class="answers"> 11</p>
            </div>

            <div class="textdivs">
            <p>Fastest previous swim: </p>
            <p class="answers"> 2.4 Lengths per min.</p>
            </div>
            <div class="textdivs">
            <p>Longest ever swim: </p>
            <p class="answers"> 62 Lengths.</p>
            </div>{/*Medal icons for both. */}

            <h2>Recent swims</h2>
            <table id="table">
                <tr>
                    <th>Date:</th>
                    <th>Lengths: </th>
                    <th> Time spent swimming:</th>
                </tr>
                <tr>
                    <th>01/01/25</th>
                    <th>50</th>
                    <th>35 Minutes</th>
                </tr>
                <tr>
                    <th>01/01/25</th>
                    <th>50</th>
                    <th>35 Minutes</th>
                </tr>
                <tr>
                    <th>30/12/25</th>
                    <th>5</th>
                    <th>35 Minutes</th>
                </tr>
            </table>

            <div class="textdivs">
            <p>Average minutes per recent swims: </p>
            <p class="answers"> 35.</p>
            </div>
            <div class="textdivs">
            <p>Average lengths completed recently: </p>
            <p class="answers"> 39.</p>
            </div>

        </div>
    )
}

function SwimmingAdd() {
    return (
        <div className="swimming content">
            <h1>Add a new swim:</h1>
            <label>How long were you swimming for?
                <input type="number" placeholder="30"></input> Minutes
            </label>
            <br/>
            <br/>
            <label>How many lengths did you complete?
                <input type="number" placeholder="25"></input> Lengths
            </label>
            <br/>
            <br/>
            <label>How did you find the swim?
                <br/>
                <button value="good">Good</button>
                <button value="bad">Bad</button>
            </label>
            <br/>
            <br/>
            <label>Optional: Add an explanation of why you think the swim was good/bad:
                <br/>
                <input type="text" placeholder="I was extra tired"></input>
            </label>
            <br/>
            <br/>
            <button className="button" type="submit">Submit Swim</button>

        </div>
    )
}

export { Swimming, SwimmingAdd };