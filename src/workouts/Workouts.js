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

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const userId = authContext.user().sub;

    useEffect(() => {
        GetExercises().then(exercises => {
            // managed to filter by explicitly writing id, so it should be achievable with a loop over selectedExercises [id]???
            const test = exercises.filter(ex => ex.id === "d09be184-158a-4905-83af-0e49d6c08609");
            setExercises(test);
        })
    }, [])

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("routine"))) {
            setSelectedExercises(JSON.parse(sessionStorage.getItem("routine")).setList);
        }
    }, [])

    const onCheck = (e, exercise) => {
        if (e.target.checked) {
            setSelectedExercises((se) => {
                return [...se, exercise];
            })
            setExercises(exercises.filter((ex) => ex.id !== exercise.id));
        }
        else {
            setExercises((ex) => {
                return [...ex, exercise];
            })
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

    const onSubmit = () => {
        let newArray = [];
        selectedExercises.forEach(exercise => {
            newArray.push(exercise.id);
        });
        AddRoutine(userId, newArray).then((exercises) => {
            console.log(exercises);
            sessionStorage.setItem("routine", JSON.stringify(exercises));
            navigate("exercises");
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

export default Workouts;