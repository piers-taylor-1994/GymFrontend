import { useEffect, useState } from "react"
import { GetExercises } from "../workouts/Data"
import { GetLeaderboard } from "./Data";
import { Loader } from "../layout/Layout";
import "./leaderboard.scss"

function Leaderboard() {
    const [exercises, setExercises] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);

    const [loading, setLoading] = useState(false);
    const [sectionLoading, setSectionLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        GetExercises().then((exercises) => {
            setExercises(exercises)
            setLoading(false);
        })
    }, [])

    const toDropdown = (exercise) => {
        return (
            <option value={exercise.exerciseId} key={exercise.exerciseId}>{exercise.name}</option>
        )
    }

    const options = exercises.map((e) => toDropdown(e));

    const getLeaderboard = (e) => {
        setSectionLoading(true);
        GetLeaderboard(e.target.value).then((l) => {
            setLeaderboard(l);
            setSectionLoading(false);
        })
    }

    const row = (set, i) => {
        let style = "";
        switch (i) {
            case 1:
                style = "row row-one"
                break;
            case 2:
                style = "row row-two"
                break;
            case 3:
                style = "row row-three"
                break;
            default:
                style = "row"
                break;
        }
        return (
            <div key={set.username} className={style}>
                <span>{i}.</span>
                <span className="exercise-name">{set.username}</span>
                <span>{set.weight}kg</span>
            </div>
        )
    }

    const rows = leaderboard.map((s, i) => row(s, (i + 1)));
    const display = sectionLoading ? <Loader /> : rows;

    if (loading) {
        return (
            <div className="leaderboard content">
                <h1>Leaderboard</h1>
                <Loader />
            </div>
        )
    }

    return (
        <div className="leaderboard content">
            <h1>Leaderboard</h1>
            <select onChange={getLeaderboard} defaultValue="default">
                <option value="default" disabled>Select exercise</option>
                {options}
            </select>
            <br />
            <div className="row-container">
                {display}
            </div>
        </div>
    )
}

export default Leaderboard