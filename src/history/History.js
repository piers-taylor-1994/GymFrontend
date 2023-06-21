import { useEffect, useState } from "react";
import { GetRoutineHistory, GetRoutinesHistory } from "./Data";
import { MuscleGroup } from "../workouts/Workouts";
import "./history.scss"
import { Format } from "../dates";

function WorkoutsHistory(props) {
    const [history, setHistory] = useState([]);
    const [routineList, setRoutineList] = useState([]);

    useEffect(() => {
        GetRoutinesHistory().then((history) => {
            setHistory(history);
        })
    }, [])

    const toDropdown = (routine) => {
        return (
            <option value={routine.id} key={routine.id}>{Format(routine.date).dayYear}</option>
        )
    }

    const options = history.map((routine) => toDropdown(routine));

    const getRoutine = (e) => {
        GetRoutineHistory(e.target.value).then((r) => {
            setRoutineList(r.setList);
        })
    }

    const row = (exercise) => {
        return (
            <div key={exercise.id} className="rows">
                <p>{MuscleGroup[exercise.muscleGroup]}</p>
                <p>{exercise.name}</p>
                <div className="sets">
                    <p>{exercise.weight}kg</p>
                    <p>{exercise.sets} sets</p>
                    <p>{exercise.reps} reps</p>
                </div>
            </div>
        )
    }

    const rows = routineList.map(ex => row(ex));

    return (
        <div className="history content">
            <h1>History</h1>
            <select onChange={getRoutine} defaultValue="dates">
                <option value="dates" disabled> Select a date </option>
                {options}
            </select>
            <br />
            {rows}
        </div>
    )
}

export default WorkoutsHistory;