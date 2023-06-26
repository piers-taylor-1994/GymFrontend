import { useEffect, useState } from "react";
import { GetRoutine, RemoveExerciseFromRoutine, UpdateRoutine } from "./Data";
import "./routine.scss";
import { Link, useNavigate } from "react-router-dom";
import { MuscleGroup } from "../workouts/Workouts";
import { publicUrlAppender } from "../navigation/Navigation";
import { Loader, LoaderButton } from "../layout/Layout";

function Routine() {
    const [routine, setRoutine] = useState({});
    const [routineList, setRoutineList] = useState([]);
    const [showLoaderbutton, setShowLoaderbutton] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // const storageRoutine = sessionStorage.getItem("routine");

    useEffect(() => {
        // if (JSON.parse(storageRoutine) && JSON.parse(storageRoutine).setList.length > 0) {
        //     setRoutine(JSON.parse(storageRoutine));
        //     setRoutineList(JSON.parse(storageRoutine).setList);
        GetRoutine().then(routine => {
            if (routine) {
                setRoutine(routine);
                setRoutineList(routine.setList);
                // sessionStorage.setItem("routine", JSON.stringify(routine));
            }
            setLoading(false);
        })
    }, [])

    const onExerciseUpdate = (e, id) => {
        const updateRoutineList = [...routineList];
        const input = updateRoutineList.find(
            e => e.id === id
        )

        if (e.target.id === "weight") input[e.target.id] = e.target.value.toString();
        else input[e.target.id] = parseInt(e.target.value);
        setRoutineList(updateRoutineList);

        const updatedSetList = updateRoutineList.map(i => Object.fromEntries(['id', 'weight', 'sets', 'reps'].map(f => [f, i[f]])));
        setRoutine({ id: routine.id, setList: updatedSetList });
    }

    const onSubmit = () => {
        setShowLoaderbutton(true);
        let validationCheck = true;
        routine.setList.forEach(exercise => {
            if (exercise.reps === 0 || exercise.sets === 0 || !exercise.weight || exercise.weight.trim().length === 0) {
                validationCheck = false;
                setShowError(true);
                setShowLoaderbutton(false);
            }
        });
        if (validationCheck) {
            UpdateRoutine(routine.id, routine.setList).then(routine => {
                // sessionStorage.setItem("routine", JSON.stringify(routine));
                navigate(publicUrlAppender("/history/" + routine.id));
                setShowLoaderbutton(false);
            })
        }
    }

    const onDelete = (id) => {
        RemoveExerciseFromRoutine(id).then(() => {
            setRoutineList(routineList.filter((r) => r.id !== id));
        });
    }

    const row = (exercise) => {
        return (
            <div key={exercise.id}>
                <div>
                    <span className="exercise-name">{exercise.name}</span>
                </div>
                <div className="rows">
                    <label>
                        <input id="weight" type="number" defaultValue={exercise.weight} onChange={e => { onExerciseUpdate(e, exercise.id) }} />
                        kg
                    </label>
                    <label>
                        <input id="sets" type="number" defaultValue={exercise.sets ? exercise.sets : null} onChange={e => { onExerciseUpdate(e, exercise.id) }} />
                        sets
                    </label>
                    <label>
                        <input id="reps" type="number" defaultValue={exercise.reps ? exercise.reps : null} onChange={e => { onExerciseUpdate(e, exercise.id) }} />
                        reps
                    </label>
                    <button onClick={() => onDelete(exercise.id)}>X</button>
                </div>
            </div>
        )
    }

    const rows = routineList.map(exercise => row(exercise));

    const submit = routineList && routineList.length > 0 ? <div className="button-container"><LoaderButton submit={onSubmit} show={showLoaderbutton}>Submit</LoaderButton></div> : <></>;
    const error = showError ? <span className="warning">Please fill in all fields before submitting</span> : <></>;

    if (loading) {
        return (
            <div className="routine content">
                <h1>Routine</h1>
                <Loader />
            </div>
        )
    }

    else if (routineList.length === 0) {
        return (
            <div className="routine content">
                <h1>Routine</h1>
                <p>A routine for today hasn't been added yet. <Link to={publicUrlAppender("/workouts")}>Please add one.</Link></p>
            </div>
        )
    }

    else {
        return (
            <div className="routine content">
                <h1>Routine</h1>
                <div className="routine-container">
                    {rows}
                </div>
                {submit}
                {error}
            </div>
        )
    }
}

export default Routine;