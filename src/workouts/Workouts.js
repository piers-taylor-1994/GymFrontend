import { useEffect, useState } from "react";
import { AddRoutine, GetExercises } from "./Data";
import './workouts.scss';
import { useNavigate } from "react-router-dom";
import { GetRoutine } from "../routine/Data";
import { publicUrlAppender } from "../navigation/Navigation";

const MuscleGroup = {
    0: "Shoulders",
    1: "Chest",
    2: "Triceps",
    3: "Biceps",
    4: "Upper back",
    5: "Lower back",
    6: "Core",
    7: "Glutes",
    8: "Hips",
    9: "Quads",
    10: "Hamstrings",
    11: "Calves"
}
Object.freeze(MuscleGroup);

function Workouts(props) {
    const [unfilteredExercises, setUnfilteredExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [muscleTypes, setMuscleTypes] = useState([]);

    // const storageRoutine = sessionStorage.getItem("routine");

    const navigate = useNavigate();

    useEffect(() => {
        // if (JSON.parse(storageRoutine) && JSON.parse(storageRoutine).setList.length > 0) {
        //     setSelectedExercises(JSON.parse(storageRoutine).setList);
        // }
        GetRoutine().then(routine => {
            if (routine) {
                setSelectedExercises(routine.setList);
            }
        })
    }, [])

    useEffect(() => {
        GetExercises().then(exercises => {
            if (selectedExercises && selectedExercises.length > 0) {
                selectedExercises.forEach(se => {
                    exercises = exercises.filter(ex => ex.exerciseId !== se.exerciseId);
                });
            }
            setExercises(exercises);
            setUnfilteredExercises(exercises);
        })
    }, [selectedExercises])

    useEffect(() => {
        let test = new Set();
        unfilteredExercises.forEach(ex => {
            test.add(parseInt(ex.muscleGroup));
            setMuscleTypes(Array.from(test));
        });
    }, [unfilteredExercises])

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
                <input type="checkbox" checked={selectedExercises.includes(exercise)} onChange={(e) => onCheck(e, exercise)} />
            </div>
        )
    }

    const toDropdown = (m) => {
        return (
            <option value={m} key={m}>{MuscleGroup[m]}</option>
        )
    }

    const onSubmit = () => {
        let newArray = [];
        selectedExercises.forEach(exercise => {
            newArray.push(exercise.exerciseId);
        });
        AddRoutine(newArray).then((exercises) => {
            // sessionStorage.setItem("routine", JSON.stringify(exercises));
            navigate(publicUrlAppender("/routine"));
        })
    }

    const searchFilter = (e) => {
        setExercises(unfilteredExercises.filter((ex) => ex.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    const dropdownFilter = (e) => {
        console.log(e.target.value);
        if (e.target.value === "") setExercises(unfilteredExercises);
        else {
            setExercises(unfilteredExercises.filter((ex) => parseInt(ex.muscleGroup) === parseInt(e.target.value)));
        }

    }

    const exercisesDisplay = exercises.map(e => row(e));
    const selectedExercisesDisplay = selectedExercises.map(e => row(e));
    const options = muscleTypes.map(m => toDropdown(m));

    const submit = selectedExercises.length > 0 ? <button onClick={onSubmit}>Submit</button> : <></>;

    return (
        <div className="workouts content">
            <h1>Workouts</h1>
            <div className="filters-container">
                <input type="" placeholder="Search exercises" onChange={searchFilter} />
                <select onChange={dropdownFilter} defaultValue="">
                    <option value=""></option>
                    {options}
                </select>
            </div>
            <div className="workouts-container">
                {exercisesDisplay}
            </div>
            <h2>Selected exercises</h2>
            <div className="workouts-container">
                {selectedExercisesDisplay}
            </div>
            {submit}
        </div>
    )
}

export { MuscleGroup, Workouts };