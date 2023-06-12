import { useContext, useEffect, useState } from "react";
import { AddRoutine, GetExercises } from "./Data";
import './workouts.scss';
import { AuthContext } from "../auth/Auth";
import { useNavigate } from "react-router-dom";

const MuscleGroup = {
    0: "Shoulders",
    1: "Chest",
    2: "Triceps",
    3: "Biceps"
}
Object.freeze(MuscleGroup);

function Workouts(props) {
    const[exercises, setExercises] = useState([]);
    const[selectedExercises, setSelectedExercises] = useState([]);
    
    const storageExercises = sessionStorage.getItem("routine");

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const userId = authContext.user().sub;

    useEffect(() => {
        if (JSON.parse(storageExercises) && JSON.parse(storageExercises).setList.length > 0) {
            setSelectedExercises(JSON.parse(storageExercises).setList);
        }
    }, [storageExercises])

    useEffect(() => {
        GetExercises().then(exercises => {
            if (selectedExercises && selectedExercises.length > 0) {
                selectedExercises.forEach(se => {
                    exercises = exercises.filter(ex => ex.exerciseId !== se.exerciseId);
                });
            }
            setExercises(exercises);
        })
    }, [selectedExercises])

    const onCheck = (e, exercise) => {
        if (e.target.checked) {
            setSelectedExercises((se) => {
                return [...se, exercise];
            })
            setExercises(exercises.filter((ex) => ex.exerciseId !== exercise.exerciseId));
        }
        else {
            setExercises((ex) => {
                return [...ex, exercise];
            })
            setSelectedExercises(selectedExercises.filter((ex) => ex.exerciseId !== exercise.exerciseId));
        }
    }

    const row = (exercise) => {
        return (
            <div key={exercise.exerciseId} className="rows">
                <p>{MuscleGroup[exercise.muscleGroup]}</p>
                <p>{exercise.name}</p>
                <p>{exercise.description}</p>
                <input type="checkbox" checked={selectedExercises.includes(exercise)} onChange={(e) => onCheck(e, exercise)}/>
            </div>
        )
    }

    console.log(exercises);
    console.log(selectedExercises);

    const onSubmit = () => {
        let newArray = [];
        selectedExercises.forEach(exercise => {
            newArray.push(exercise.exerciseId);
        });
        AddRoutine(userId, newArray).then((exercises) => {
            console.log(exercises);
            sessionStorage.setItem("routine", JSON.stringify(exercises));
            navigate("routine");
        })
    }

    const exercisesDisplay = exercises.map(e => row(e));
    const selectedExercisesDisplay = selectedExercises.map(e => row(e));

    const submit = selectedExercises.length > 0 ? <button onClick={onSubmit}>Submit</button> : <></>;

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

export { MuscleGroup, Workouts };