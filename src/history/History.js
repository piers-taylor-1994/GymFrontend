import { useEffect, useState } from "react";
import { GetRoutineHistory, GetRoutinesHistory } from "./Data";
import "./history.scss"
import { Format } from "../layout/dates";
import { useParams } from "react-router-dom";
import { Loader } from "../layout/Layout";

function WorkoutsHistory(props) {
    const [history, setHistory] = useState([]);
    const [routineList, setRoutineList] = useState([]);
    const [selectValue, setSelectValue] = useState("dates");
    const [loading, setLoading] = useState(true);
    const [sectionLoading, setSectionLoading] = useState(false);

    const historyId = useParams().id;
    
    const getRoutine = (id) => {
        setSectionLoading(true);
        GetRoutineHistory(id).then((r) => {
            setRoutineList(r.setList);
            setSectionLoading(false);
            setSelectValue(id);
        })
    }

    useEffect(() => {
        GetRoutinesHistory().then((history) => {
            setHistory(history);
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        const selectedHistory = JSON.parse(sessionStorage.getItem("selectedHistory"));
        if (historyId) {
            getRoutine(historyId);
            setSelectValue(historyId);
            sessionStorage.setItem("selectedHistory", JSON.stringify(historyId));
        }
        else if (selectedHistory) {
            getRoutine(selectedHistory);
            setSelectValue(selectedHistory);
        }
    }, [historyId])

    const toDropdown = (routine) => {
        return (
            <option value={routine.id} key={routine.id}>{Format(routine.date).dayYear}</option>
        )
    }

    const options = history.map((routine) => toDropdown(routine));

    const row = (exercise) => {
        return (
            <div key={exercise.id} className="row">
                <span className="exercise-name">{exercise.name}</span>
                <div className="sets">
                    <span>{exercise.weight}kg</span>
                    <span>{exercise.sets} sets</span>
                    <span>{exercise.reps} reps</span>
                </div>
            </div>
        )
    }

    const rows = routineList.map(ex => row(ex));
    const display = sectionLoading ? <Loader /> : rows;

    const onDropdownChange = (e) => {
        getRoutine(e.target.value);
        sessionStorage.setItem("selectedHistory", JSON.stringify(e.target.value));
    }

    if (loading) {
        return (
            <div className="history content">
                <h1>History</h1>
                <Loader />
            </div>
        )
    }

    else {
        return (
            <div className="history content">
                <h1>History</h1>
                <select onChange={onDropdownChange} value={selectValue}>
                    <option value="dates" disabled> Select a date </option>
                    {options}
                </select>
                <br />
                {display}
            </div>
        )
    }
}

export default WorkoutsHistory;