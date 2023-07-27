import { useEffect, useState } from "react";
import { GetRoutineHistory, GetRoutinesHistory } from "./Data";
import "./history.scss"
import { Format } from "../layout/dates";
import { useParams } from "react-router-dom";
import { Loader } from "../layout/Layout";
import * as Icon from "../layout/Icons";

function WorkoutsHistory(props) {
    const [history, setHistory] = useState([]);

    const [historyMonth, setHistoryMonth] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(0);

    const [routineList, setRoutineList] = useState([]);
    const [routineListDate, setRoutineListDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [sectionLoading, setSectionLoading] = useState(false);

    const historyId = useParams().id;

    const getRoutine = (id) => {
        setSectionLoading(true);
        GetRoutineHistory(id).then((r) => {
            setRoutineList(r.setList);
            setSectionLoading(false);
        })
    }

    useEffect(() => {
        GetRoutinesHistory().then((history) => {
            setHistory(history);
            let dateArray = new Set();
            history.forEach(h => {
                dateArray.add(Format(h.date).monthYear);
            });
            setHistoryMonth(Array.from(dateArray));
            setLoading(false);
        })
    }, [])


    useEffect(() => {
        if (historyId) {
            getRoutine(historyId);
            setRoutineListDate(new Date());
        }
    }, [historyId])

    const toSquare = (routine) => {
        const onSquareClick = () => {
            getRoutine(routine.id);
            setRoutineListDate(routine.date);
        }

        if (Format(routine.date).monthYear === historyMonth[currentMonth]) {
            return (
                <div className="square" key={routine.id} onClick={onSquareClick}>
                    {Format(routine.date).date}
                </div>
            )
        }
    }

    const options = history.map((routine) => toSquare(routine));

    const row = (exercise) => {
        return (
            <div key={exercise.exerciseId} className="row">
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

    const HistorySquares = (props) => {
        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        const formatDate = (date) => {
            let month = date.substring(1, 2);
            month = months[month - 1];

            return month + " " + date.substring(2);
        }

        return (
            <div className="history-squares">
                <h1>History</h1>
                <h2>{formatDate(historyMonth[currentMonth])}</h2>
                <div className="squares-container">
                    {options}
                </div>
                <div className="navigation-container">
                    {currentMonth ? <button id="previous" onClick={() => setCurrentMonth((c) => { return (c - 1) })}>Previous</button> : <></>}
                    {currentMonth + 1 !== historyMonth.length ? <button id="next" onClick={() => setCurrentMonth((c) => { return (c + 1) })}>Next</button> : <></>}
                </div>
            </div>
        )
    }

    const HistorySets = (props) => {
        if (sectionLoading) return (
            <Loader />
        )

        else {
            return (
                <div className="history-sets">
                    <h1>{Format(routineListDate).dayYearShorter}</h1>
                    {rows}
                </div>
            )
        }
    }

    const display = routineList.length === 0 ? <HistorySquares /> : <HistorySets />;
    const backButton = routineList.length !== 0
        ? <div id="back-container" onClick={() => setRoutineList([])}>
            <Icon.Back />
        </div>
        : <></>

    return (
        <div className="history content">
            {backButton}
            {loading ? <Loader /> : display}
        </div>
    )
}

export default WorkoutsHistory;