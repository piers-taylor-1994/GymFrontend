import { useEffect, useState } from "react";
import { GetLastSetForExercises, GetRoutine, RemoveExerciseFromRoutine, UpdateRoutine } from "./Data";
import "./routine.scss";
import { Link, useNavigate } from "react-router-dom";
import { Loader, LoaderButton } from "../layout/Layout";
import DnD from "../layout/DnD";

function Routine() {
    const [routine, setRoutine] = useState({});
    const [showLoaderbutton, setShowLoaderbutton] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [lastSets, setLastSets] = useState([]);
    const navigate = useNavigate();

    let setList = [];

    useEffect(() => {
        let storedRoutine = JSON.parse(sessionStorage.getItem("routine"));
        if (storedRoutine && storedRoutine.setList && storedRoutine.setList.length > 0) {
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
        if (routine && routine.setList) {
            let routineExerciseIds = []
            routine.setList.map((r) => routineExerciseIds.push(r.exerciseId));
            GetLastSetForExercises(routineExerciseIds).then((sets) => {
                setLastSets(sets);
            })
            setLoading(false);
        }
    }, [routine])

    const onExerciseUpdate = (e, id) => {
        setList = [...routine.setList];
        const input = setList.find(
            e => e.id === id
        )

        if (e.target.id === "weight") input[e.target.id] = parseFloat(e.target.value);
        else input[e.target.id] = parseInt(e.target.value);
        sessionStorage.setItem("routine", JSON.stringify({
            id: routine.id,
            setList: setList
        }));
    }

    const onDelete = (id) => {
        RemoveExerciseFromRoutine(id).then(() => {
            const updatedRoutine = ({
                id: routine.id,
                setList: routine.setList.filter((r) => r.id !== id)
            });
            if (JSON.parse(sessionStorage.getItem("routine")) && JSON.parse(sessionStorage.getItem("routine")).setList.length > 1) sessionStorage.setItem("routine", JSON.stringify(updatedRoutine));
            else sessionStorage.removeItem("routine");
            setRoutine(updatedRoutine);
        });
    }

    const onOrderUpdate = (setDict) => {
        const setList = [...routine.setList];
        for (const [key, value] of Object.entries(setDict)) {
            setList.find(t => t.id === key).order = value;
        }
        const updatedRoutine = ({
            id: routine.id,
            setList: setList
        });
        sessionStorage.setItem("routine", JSON.stringify(updatedRoutine));
        setRoutine(updatedRoutine);
    }

    const onSubmit = () => {
        setShowLoaderbutton(true);

        routine.setList.forEach(r => {
            setList.forEach(s => {
                if (r.id === s.id) {
                    r.weight = s.weight;
                    r.sets = s.sets;
                    r.reps = s.reps;
                }
            });
        });
        UpdateRoutine(routine.id, routine.setList).then(response => {
            if (response === 400) {
                setShowError(true);
                setShowLoaderbutton(false);
            }
            else {
                navigate("/history/" + response.id);
                setShowLoaderbutton(false);
            }
        })
    }

    const error = showError ? <span className="warning">Please fill in all fields before submitting</span> : <></>;
    const submit = routine.setList && routine.setList.length > 0
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
                        <input id="weight" type="number" defaultValue={exercise.weight ? exercise.weight : null} placeholder={lastExercise ? lastExercise.weight : null} onChange={e => { onExerciseUpdate(e, exercise.id) }} />
                        kg
                    </label>
                    <label>
                        <input id="sets" type="number" defaultValue={exercise.sets ? exercise.sets : null} placeholder={lastExercise ? lastExercise.sets : null} onChange={e => { onExerciseUpdate(e, exercise.id) }} />
                        sets
                    </label>
                    <label>
                        <input id="reps" type="number" defaultValue={exercise.reps ? exercise.reps : null} placeholder={lastExercise ? lastExercise.reps : null} onChange={e => { onExerciseUpdate(e, exercise.id) }} />
                        reps
                    </label>
                    <button onClick={() => onDelete(exercise.id)}>X</button>
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

        const sets = routine.setList && routine.setList.length > 0 ? <DnD array={routine.setList} component={SetCard} update={onOrderUpdate} /> : <p>A routine for today hasn't been added yet. <Link to="/workouts">Please add one.</Link></p>;

        return (
            <div className="sets">
                {sets}
            </div>
        )
    }

    return (
        <div className="routine content">
            <h1>Routine</h1>
            {routine.setList && routine.setList.length > 0 ? <span className="blurb">Drag and drop to re-order</span> : <></>}
            <Sets />
            {submit}
        </div>
    )
}

export default Routine;