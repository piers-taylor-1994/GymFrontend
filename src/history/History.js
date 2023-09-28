import { useEffect, useRef, useState } from "react";
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

    const touchStart = useRef(null);
    const touchEnd = useRef(null);
    const minSwipeDistance = 100;

    const historyId = useParams().id;

    const getRoutine = (id) => {
        setSectionLoading(true);
        GetRoutineHistory(id).then((r) => {
            setRoutineList(r.exerciseSets);
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

    const filterHistoryByMonth = () => {
        return history.filter(h => Format(h.date).monthYear === historyMonth[currentMonth]);
    }

    const toSquare = (routine) => {
        let squareClass = routine.muscleArea === 0 ? " upper" : routine.muscleArea === 1 ? " core" : " lower"

        const onSquareClick = () => {
            getRoutine(routine.id);
            setRoutineListDate(routine.date);
        }

        return (
            <div className={"square" + squareClass} key={routine.id} onClick={onSquareClick}>
                {Format(routine.date).date}
            </div>
        )
    }

    const options = filterHistoryByMonth().reverse().map((routine) => toSquare(routine));

    const row = (exercise) => {
        const toSetRow = (set) => {
            return (
                <div className="sets" key={set.order}>
                    <span>{set.weight}kg</span>
                    <span>{set.sets} {set.sets === 1 ? "set" : "sets"}</span>
                    <span>{set.reps} {set.reps === 1 ? "rep" : "reps"}</span>
                </div>
            )
        }

        const setRows = exercise.exerciseArray.map((ea) => toSetRow(ea))

        return (
            <div key={exercise.exerciseId} className="row">
                <span className="exercise-name">{exercise.name}</span>
                <div>
                    {setRows}
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

        const onTouchStart = (e) => {
            touchStart.current = null;
            touchEnd.current = null;
            touchStart.current = e.targetTouches[0].clientX;
        }

        const onTouchMove = (e) => {
            touchEnd.current = e.targetTouches[0].clientX;
        }

        const onTouchEnd = (e) => {
            if (!touchStart.current || !touchEnd.current) return
            const distance = touchStart.current - touchEnd.current;
            const isLeftSwipe = distance > minSwipeDistance
            const isRightSwipe = distance < -minSwipeDistance
            if (isLeftSwipe || isRightSwipe) {
                if (isLeftSwipe && currentMonth + 1 !== historyMonth.length) setCurrentMonth((c) => { return (c + 1) });
                else if (isRightSwipe && currentMonth) setCurrentMonth((c) => { return (c - 1) });
            }
        }

        return (
            <div className="history-squares" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                {historyMonth.length > 1 ? <span className="blurb">Swipe to change month</span> : <></>}
                <div className="subtitle-container">
                    {currentMonth ? <Icon.LeftArrow /> : <></>}
                    <h2>{formatDate(historyMonth[currentMonth])} ({filterHistoryByMonth().length})</h2>
                    {currentMonth + 1 !== historyMonth.length ? <Icon.RightArrow /> : <></>}
                </div>
                <div className="squares-container">
                    {options}
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

    const display = loading
        ? <Loader />
        : history.length === 0
            ? <span>No routines recorded yet</span>
            : routineList.length === 0
                ? <HistorySquares />
                : <HistorySets />;

    const backButton = routineList.length !== 0
        ? <div id="back-container" onClick={() => setRoutineList([])}>
            <Icon.Back />
        </div>
        : <></>

    const header = history.length === 0 || routineList.length === 0 ? <h1 className="header">History</h1> : <></>;

    return (
        <div className="history content">
            {backButton}
            {header}
            {display}
        </div>
    )
}

export default WorkoutsHistory;