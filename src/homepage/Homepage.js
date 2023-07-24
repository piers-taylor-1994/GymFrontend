import { Format } from "../layout/dates";


function Homepage(props) {
    const array = []
    const test = {
        Id: 0,
        Name: "Cheese plant",
        LastWatered: '20/07/2023'
    }
    array.push(test);
    console.log(array);

    const changeDate = () => {
        array.find(a => a.Id === 0).Name = "cheese plan2?";
        console.log(array);
    }

    const toRow = (a) => {
        const newDate = (e) => {
            array.find(a => a.Id === parseInt(e.target.value)).LastWatered = new Date().toLocaleDateString();
            console.log(array);
        }

        return (
            <div key={a.Id}>
                {a.Id}
                {a.Name}
                {a.LastWatered}
                <button value={a.Id} onClick={newDate}>Test</button>
            </div>
        )
    }

    const arrayShow = array.map(a => toRow(a));

    return (
        <div>
            <div className="homepage content">
                <h1>{Format(new Date()).day}</h1>
                {arrayShow}
                
            </div>
        </div>
    )
}

export default Homepage;