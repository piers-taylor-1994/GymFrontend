import { useEffect, useState } from "react";
import { AddRoutine, GetLastSetForExercises, GetRoutine, RemoveExerciseFromRoutine, UpdateRoutine } from "./Data";
import "./routine.scss";
import { Link, useNavigate } from "react-router-dom";
import { Loader, LoaderButton } from "../layout/Layout";
import DnD from "../layout/DnD";

function Routine() {
    const [routine, setRoutine] = useState([]);
    const [showLoaderbutton, setShowLoaderbutton] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [lastSets, setLastSets] = useState([]);
    const navigate = useNavigate();

    let setList = [];

    useEffect(() => {
        let storedRoutine = JSON.parse(sessionStorage.getItem("routine"));
        if (storedRoutine && storedRoutine.length > 0) {
            setRoutine(storedRoutine);
            setLoading(false);
        }
        else {
            GetRoutine().then(routine => {
                if (routine) {
                    setRoutine(routine);
                }
                setLoading(false);
            })
        }
    }, [])

    useEffect(() => {
        setLoading(true);
        if (routine) {
            let routineExerciseIds = []
            routine.map((r) => routineExerciseIds.push(r.exerciseId));
            GetLastSetForExercises(routineExerciseIds).then((sets) => {
                setLastSets(sets);
            })
            setLoading(false);
        }
    }, [routine])

    const onExerciseUpdate = (e, exerciseId) => {
        setList = [...routine];
        const input = setList.find(
            e => e.exerciseId === exerciseId
        )
        if (e.target.id === "weight") input[e.target.id] = parseFloat(e.target.value);
        else input[e.target.id] = parseInt(e.target.value);
        sessionStorage.setItem("routine", JSON.stringify(setList));
    }

    const onDelete = (exerciseId) => {
        // RemoveExerciseFromRoutine(id).then(() => {});
        if (JSON.parse(sessionStorage.getItem("routine")) && JSON.parse(sessionStorage.getItem("routine")).length > 1) sessionStorage.setItem("routine", JSON.stringify(routine.filter((r) => r.exerciseId !== exerciseId)));
        else sessionStorage.removeItem("routine");
        setRoutine(routine.filter((r) => r.exerciseId !== exerciseId));
    }

    const onOrderUpdate = (setDict) => {
        const setList = [...routine];
        for (const [key, value] of Object.entries(setDict)) {
            setList.find(t => t.exerciseId === key).order = value;
        }
        sessionStorage.setItem("routine", JSON.stringify(setList));
        setRoutine(setList);
    }

    const onSubmit = () => {
        setShowLoaderbutton(true);

        routine.forEach(r => {
            setList.forEach(s => {
                if (r.id === s.id) {
                    r.weight = s.weight;
                    r.sets = s.sets;
                    r.reps = s.reps;
                }
            });
        });
        console.log(routine);
        AddRoutine(routine);
        // UpdateRoutine(routine.id, routine).then(response => {
        //     if (response === 400) {
        //         setShowError(true);
        //         setShowLoaderbutton(false);
        //     }
        //     else {
        //         navigate("/history/" + response.id);
        //         setShowLoaderbutton(false);
        //     }
        // })
    }

    const error = showError ? <span className="warning">Please fill in all fields before submitting</span> : <></>;
    const submit = routine && routine.length > 0
        ? <div className="button-container submit-container">{error}<LoaderButton buttonStyle="button-smaller" submit={onSubmit} show={showLoaderbutton}>Submit</LoaderButton></div>
        : <></>;

    const SetCard = (props) => {
        const opacity = props.isDragging ? 0.5 : 1;
        const exercise = props.card;
        const lastExercise = lastSets ? lastSets.find(t => t.exerciseId === exercise.exerciseId) : {};

        return (
            <div ref={props.cardRef} style={{ ...props.styleCard, opacity }} data-handler-id={props.handlerId} className="set">
                <div>
                    <span className="exercise-name">{exercise.name}</span>
                </div>
                <div className="row">
                    <label>
                        <input id="weight" type="number" defaultValue={exercise.weight ? exercise.weight : null} placeholder={lastExercise ? lastExercise.weight : null} onChange={e => { onExerciseUpdate(e, exercise.exerciseId) }} />
                        kg
                    </label>
                    <label>
                        <input id="sets" type="number" defaultValue={exercise.sets ? exercise.sets : null} placeholder={lastExercise ? lastExercise.sets : null} onChange={e => { onExerciseUpdate(e, exercise.exerciseId) }} />
                        sets
                    </label>
                    <label>
                        <input id="reps" type="number" defaultValue={exercise.reps ? exercise.reps : null} placeholder={lastExercise ? lastExercise.reps : null} onChange={e => { onExerciseUpdate(e, exercise.exerciseId) }} />
                        reps
                    </label>
                    <button onClick={() => onDelete(exercise.exerciseId)}>X</button>
                </div>
            </div>
        )
    }

    function Sets(props) {
        if (loading) {
            return (
                <div className="sets">
                    <Loader />
                </div>
            )
        }

        const sets = routine && routine.length > 0 ? <DnD array={routine} component={SetCard} update={onOrderUpdate} /> : <p>A routine for today hasn't been added yet. <Link to="/workouts">Please add one.</Link></p>;

        return (
            <div className="sets">
                {sets}
            </div>
        )
    }

    return (
        <div className="routine content">
            <h1>Routine</h1>
            {routine && routine.length > 0 ? <span className="blurb">Drag and drop to re-order</span> : <></>}
            <Sets />
            {submit}
        </div>
    )
}

export default Routine;