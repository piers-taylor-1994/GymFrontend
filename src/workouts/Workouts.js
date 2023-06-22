import { useEffect, useState } from "react";
import { AddRoutine, GetExercises } from "./Data";
import './workouts.scss';
import { useNavigate } from "react-router-dom";
import { GetRoutine } from "../routine/Data";
import { publicUrlAppender } from "../navigation/Navigation";
import { LoaderButton, LoaderPage } from "../layout/Layout";

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
    const [showLoaderbutton, setShowLoaderbutton] = useState(false);
    const [loading, setLoading] = useState(true);

    const [searchFilterQuery, setSearchFilterQuery] = useState("");
    const [dropdownFilterQuery, setDropdownFilterQuery] = useState(-1);

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
            setLoading(false)
        })
    }, [selectedExercises])

    useEffect(() => {
        let test = new Set();
        unfilteredExercises.forEach(ex => {
            test.add(parseInt(ex.muscleGroup));
            setMuscleTypes(Array.from(test));
        });
    }, [unfilteredExercises])

    useEffect(() => {
        if (searchFilterQuery) setExercises(unfilteredExercises.filter((ex) => ex.name.toLowerCase().includes(searchFilterQuery.toLowerCase())));
        if (parseInt(dropdownFilterQuery) !== -1) setExercises(unfilteredExercises.filter((ex) => parseInt(ex.muscleGroup) === parseInt(dropdownFilterQuery)));
    }, [unfilteredExercises, searchFilterQuery, dropdownFilterQuery])

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
        setShowLoaderbutton(true);
        let selectedExercisesIds = [];
        selectedExercises.forEach(exercise => {
            selectedExercisesIds.push(exercise.exerciseId);
        });
        AddRoutine(selectedExercisesIds).then((exercises) => {
            // sessionStorage.setItem("routine", JSON.stringify(exercises));
            setShowLoaderbutton(false);
            navigate(publicUrlAppender("/routine"));
        })
    }

    const searchFilter = (e) => {
        setSearchFilterQuery(e.target.value);
        setExercises(unfilteredExercises.filter((ex) => ex.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    const dropdownFilter = (e) => {
        if (e.target.value === "") setExercises(unfilteredExercises);
        else {
            setDropdownFilterQuery(e.target.value);
            setExercises(unfilteredExercises.filter((ex) => parseInt(ex.muscleGroup) === parseInt(e.target.value)));
        }
    }

    const exercisesDisplay = exercises.map(e => row(e));
    const selectedExercisesDisplay = selectedExercises.map(e => row(e));
    const options = muscleTypes.map(m => toDropdown(m));

    const submit = selectedExercises.length > 0 ? <div className="button-container"><LoaderButton submit={onSubmit} show={showLoaderbutton}>Submit</LoaderButton></div> : <></>;

    if (loading) {
        return (
            <LoaderPage />
        )
    }

    else {
        return (
            <div className="workouts content">
                <h1>Workouts</h1>
                <div className="filters-container">
                    <input type="" placeholder="Search exercises" onChange={searchFilter} />
                    <select onChange={dropdownFilter} defaultValue={-1}>
                        <option value={-1}></option>
                        {options}
                    </select>
                </div>
                <div className="workouts-container workouts-container-top">
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
}

export { MuscleGroup, Workouts };