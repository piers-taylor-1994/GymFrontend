import { useContext, useEffect, useState } from "react";
import { GetRoutine, UpdateRoutine } from "./Data";
import { AuthContext } from "../../auth/Auth";

import "./routine.scss";
import { MuscleGroup } from "../Workouts";
import { Link } from "react-router-dom";

function Routine() {
    const[routine, setRoutine] = useState({});
    const[routineList, setRoutineList] = useState([]);

    const authContext = useContext(AuthContext);
    const userId = authContext.user().sub;

    const storageRoutine = sessionStorage.getItem("routine");

    useEffect(() => {
        if (JSON.parse(storageRoutine) && JSON.parse(storageRoutine).setList.length > 0) {
            setRoutine(JSON.parse(storageRoutine));
            setRoutineList(JSON.parse(storageRoutine).setList);
        }
        else {
            GetRoutine(userId).then(routine => {
                if (routine) {
                    setRoutine(routine);
                    setRoutineList(routine.setList);
                    sessionStorage.setItem("routine", JSON.stringify(routine));
                }
            })
        }
    }, [storageRoutine, userId, routine.id])

    if (routineList.length === 0) {
        return (
            <div className="routine">
                <h1>Routine</h1>
                <p>A routine for today hasn't been added yet. <Link to="/workouts">Please add one.</Link></p>
            </div>
        )
    }

    const onExerciseUpdate = (e, id) => {
        const updateRoutineList = [...routineList];
        const input = updateRoutineList.find(
            e => e.id === id
        )
        input[e.target.id] = parseInt(e.target.value);
        setRoutineList(updateRoutineList);

        const updatedSetList = updateRoutineList.map(i => Object.fromEntries(['id','weight', 'sets', 'reps'].map(f => [f, i[f]])));
        setRoutine({ id: routine.id, setList: updatedSetList });
    }

    const onSubmit = () => {
        UpdateRoutine(routine.id, routine.setList).then(routine => {
            console.log(routine);
            sessionStorage.setItem("routine", JSON.stringify(routine));
        })
    }

    const row = (exercise) => {
        return (
            <div key={exercise.id} className="rows">
                <p>{MuscleGroup[exercise.muscleGroup]}</p>
                <p>{exercise.name}</p>
                <label>
                    <input id="weight" type="number" defaultValue={exercise.weight} onChange={e => {onExerciseUpdate(e, exercise.id)}}/>
                    kg
                </label>
                <label>
                    <input id="sets" type="number" defaultValue={exercise.sets} onChange={e => {onExerciseUpdate(e, exercise.id)}}/>
                    sets
                </label>
                <label>
                    <input id="reps" type="number" defaultValue={exercise.reps} onChange={e => {onExerciseUpdate(e, exercise.id)}}/>
                    reps
                </label>
            </div>
        )
    }

    const submit = routineList && routineList.length > 0 ? <button onClick={onSubmit}>Submit</button> : <></>;

    const rows = routineList.map(exercise => row(exercise));

    return (
        <div className="routine">
            <h1>Routine</h1>
            <div className="routine-container">
                {rows}
            </div>
            {submit}
        </div>
    )
}

export default Routine;