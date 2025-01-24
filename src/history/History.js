import { useEffect, useRef, useState } from "react";
import { AddGhostData, GetRoutineHistory, GetRoutinesHistory, GetSwimmingHistory, GetSwimmingsHistory } from "./Data";
import "./history.scss"
import { Format } from "../layout/dates";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader, LoaderButton } from "../layout/Layout";
import * as Icon from "../layout/Icons";

const HistoryType = {
    "Workouts": 0,
    "Swimming": 1,
    "Ghost": 2
}
Object.freeze(HistoryType);

function WorkoutsHistory(props) {
    const [history, setHistory] = useState([]);

    const [historyMonth, setHistoryMonth] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(0);

    const [routineList, setRoutineList] = useState([]);
    const [routineListDate, setRoutineListDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [sectionLoading, setSectionLoading] = useState(false);

    const [showLoaderbutton, setShowLoaderButton] = useState(false);

    const [showGhost, setShowGhost] = useState(false);

    const navigate = useNavigate();

    const touchStart = useRef(null);
    const touchEnd = useRef(null);
    const minSwipeDistance = 100;

    const submissionType = useRef(0);

    const historyId = useParams().id;

    const getRoutine = (id) => {
        setSectionLoading(true);
        if (props.historyType !== HistoryType.Swimming) {
            GetRoutineHistory(id, submissionType.current).then((r) => {
                setRoutineList(r.exerciseSets);
                setSectionLoading(false);
            })
        }
        else {
            GetSwimmingHistory(id).then((r) => {
                setRoutineList([[r]]);
                setSectionLoading(false);
            })
        }
    }

    useEffect(() => {
        if (props.historyType === HistoryType.Swimming) {
            GetSwimmingsHistory().then((history) => {
                setHistory(history);
                let dateArray = new Set();
                history.forEach(h => {
                    dateArray.add(Format(h.date).monthYear);
                });
                setHistoryMonth(Array.from(dateArray));
                setLoading(false);
            })
        }
        else {
            if (props.historyType === HistoryType.Ghost) {
                setShowGhost(false);
                submissionType.current = 1;
            }
            else {
                GetRoutinesHistory(1).then(ghostHistory => {
                    if (ghostHistory.length > 0) setShowGhost(true);
                })
                submissionType.current = 0;
            }
            GetRoutinesHistory(submissionType.current).then((history) => {
                setHistory(history);
                let dateArray = new Set();
                history.forEach(h => {
                    dateArray.add(Format(h.date).monthYear);
                });
                setHistoryMonth(Array.from(dateArray));
                setLoading(false);
            })
        }
    }, [props])

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
        let squareClass = submissionType.current === 1 ? " ghost" : routine.muscleArea === 0 ? " upper" : routine.muscleArea === 1 ? " core" : " lower"

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
            if (props.historyType !== HistoryType.Swimming) {
                return (
                    <div className="sets-swimming">
                        <span>{set.weight}kg</span>
                        <span>{set.sets} {set.sets === 1 ? "set" : "sets"}</span>
                        <span>{set.reps} {exercise.exerciseId.toLowerCase() === '471565BD-972E-4B11-A659-6AB93133F017'.toLowerCase() ? "secs" : set.reps === 1 ? "rep" : "reps"}</span>
                    </div>
                )
            }
            else {
                return (
                    <div className="sets" key={set.order}>
                        <span>{set.lengths} {set.lengths === 1 ? "length" : "lengths"}</span>
                        <span>{set.timeSwimming} {set.timeSwimming === 1 ? "min" : "mins"}</span>
                    </div>
                )
            }
        }

        const exerciseArray = props.historyType !== HistoryType.Swimming ? exercise.exerciseArray : exercise;
        const setRows = exerciseArray.map((ea) => toSetRow(ea))

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
            let month = date.substring(0, 2);
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
        let ghostSubmit = (
            <div className="button-container submit-container">
                <LoaderButton buttonStyle="button-s" submit={onSubmit} show={showLoaderbutton}>
                    Submit
                </LoaderButton>
            </div>
        )

        if (sectionLoading) return (
            <Loader />
        )

        else {
            return (
                <div className="history-sets">
                    <h1>{Format(routineListDate).dayMonth}</h1>
                    {rows}
                    {submissionType.current === 1 ? ghostSubmit : <></>}
                </div>
            )
        }
    }

    const onSubmit = () => {
        setShowLoaderButton(true);
        AddGhostData(history[0].id, routineListDate).then(response => {
            setShowLoaderButton(false);
            sessionStorage.removeItem("routine");
            setRoutineList([]);
            navigate("/history");
        });
    }

    const display = loading
        ? <Loader />
        : history.length === 0
            ? <span>No {submissionType.current === 1 ? "ghost routines" : "routines"} recorded yet</span>
            : routineList.length === 0
                ?
                <>
                    {/* <GhostNav /> */}
                    <HistorySquares />
                </>
                : <HistorySets />;

    const backButton = routineList.length !== 0
        ? <div id="back-container" onClick={() => setRoutineList([])}>
            <Icon.Back />
        </div>
        : <></>

    const header = history.length === 0 || routineList.length === 0 ? <h1 className="header">{submissionType.current === 1 ? "Ghost history" : "History"}</h1> : <></>;

    function GhostNav(props) {
        if (showGhost === true) {
            return (
                <div className="navigation-top-left"><Link className="nav-item" to={"./ghost"}><Icon.Ghost /></Link></div>
            )
        }
        else return (<></>)
    }

    return (
        <div className="history content">
            {backButton}
            {header}
            {display}
        </div>
    )
}

export { WorkoutsHistory, HistoryType };