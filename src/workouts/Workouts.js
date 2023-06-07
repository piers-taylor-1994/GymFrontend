import { useEffect, useState } from "react";
import { GetExercises } from "./Data";
import './workouts.scss';

const MuscleGroup = {
    0: "Shoulders",
    1: "Chest",
    2: "Triceps",
    3: "Biceps"
}
Object.freeze(MuscleGroup);

function Workouts(props) {
    const[exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    useEffect(() => {
        GetExercises().then(exercises => {
            setExercises(exercises);
        })
    }, [])

    const onCheck = (e, exercise) => {
        if (e.target.checked) {
            setSelectedExercises((se) => {
                return [...se, exercise];
            })
        }
        else {
            setSelectedExercises(selectedExercises.filter((ex) => ex.id !== exercise.id));
        }
    }

    const row = (exercise) => {
        return (
            <div key={exercise.id} className="rows">
                <p>{MuscleGroup[exercise.muscleGroup]}</p>
                <p>{exercise.name}</p>
                <p>{exercise.description}</p>
                <input type="checkbox" checked={selectedExercises.includes(exercise)} onChange={(e) => onCheck(e, exercise)}/>
            </div>
        )
    }

    const exercisesDisplay = exercises.map(e => row(e));
    const selectedExercisesDisplay = selectedExercises.map(e => row(e));

    const submit = selectedExercises.length > 0 ? <button>Submit</button> : <></>;

    return (
        <div className="workouts">
            <div className="workouts-container top">
                {exercisesDisplay}
            </div>
            <div className="workouts-container">
                {selectedExercisesDisplay}
            </div>
            {submit}
        </div>
    )
}

export default Workouts;