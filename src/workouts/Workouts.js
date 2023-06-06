import { useEffect, useState } from "react";
import { GetExercises } from "./Data";

const MuscleGroup = {
    0: "Shoulders",
    1: "Chest",
    2: "Triceps",
    3: "Biceps"
}
Object.freeze(MuscleGroup);

function Workouts(props) {
    const[exercises, setExercises] = useState([]);

    useEffect(() => {
        GetExercises().then(exercises => {
            setExercises(exercises);
        })
    }, [])

    const row = (e) => {
        return (
            <div key={e.id}>
                <p>{e.id}</p>
                <p>{MuscleGroup[e.muscleGroup]}</p>
                <p>{e.name}</p>
                <p>{e.description}</p>
                <input type="checkbox" />
            </div>
        )
    }

    const exercisesDisplay = exercises.map(e => row(e));

    return (
        <div>
            {exercisesDisplay}
        </div>
    )
}

export default Workouts;