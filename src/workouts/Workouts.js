import { useEffect, useState } from "react";
import { AddRoutine, GetExercises } from "./Data";
import './workouts.scss';
import { useNavigate } from "react-router-dom";
import { GetRoutine } from "../routine/Data";
import { Loader, LoaderButton } from "../layout/Layout";

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

    const navigate = useNavigate();

    useEffect(() => {
        GetRoutine().then(routine => {
            if (routine) {
                setSelectedExercises(routine.setList);
            }
        })
    }, [])

    useEffect(() => {
        GetExercises().then(exercises => {
            exercises.sort((a, b) => {
                const nameA = MuscleGroup[a.muscleGroup].toUpperCase(); // ignore upper and lowercase
                const nameB = MuscleGroup[b.muscleGroup].toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
            setExercises(exercises);
            setUnfilteredExercises(exercises);
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (muscleTypes.length === 0) {
            let muscleSet = new Set();
            unfilteredExercises.forEach(ex => {
                muscleSet.add(parseInt(ex.muscleGroup));
                setMuscleTypes(Array.from(muscleSet));
            });
        }
    }, [unfilteredExercises, muscleTypes])

    useEffect(() => {
        if (searchFilterQuery) setExercises(unfilteredExercises.filter((ex) => ex.name.toLowerCase().includes(searchFilterQuery.toLowerCase())));
        if (parseInt(dropdownFilterQuery) !== -1) setExercises(unfilteredExercises.filter((ex) => parseInt(ex.muscleGroup) === parseInt(dropdownFilterQuery)));
    }, [unfilteredExercises, searchFilterQuery, dropdownFilterQuery])

    const onCheck = (e, exercise) => {
        if (e.target.checked) {
            setSelectedExercises((se) => {
                return [...se, exercise];
            })
        }
        else {
            setSelectedExercises(selectedExercises.filter((s) => s.exerciseId !== exercise.exerciseId));
        }
    }

    const row = (exercise) => {
        return (
            <div key={exercise.exerciseId} className="row">
                <p>{MuscleGroup[exercise.muscleGroup]}</p>
                <p>{exercise.name}</p>
                <input type="checkbox" checked={selectedExercises.some(s => s.exerciseId === exercise.exerciseId)} onChange={(e) => onCheck(e, exercise)} />
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
        AddRoutine(selectedExercisesIds).then((routine) => {
            let newRoutine = routine;
            let storedRoutine = JSON.parse(sessionStorage.getItem("routine"));
            if (storedRoutine && storedRoutine.setList.length > 0) {
                newRoutine.setList.forEach(n => {
                    storedRoutine.setList.forEach(s => {
                        if (n.exerciseId === s.exerciseId) {
                            n.weight = s.weight;
                            n.sets = s.sets;
                            n.reps = s.reps;
                        }
                    });
                });
            }
            sessionStorage.setItem("routine", JSON.stringify(newRoutine));
            setShowLoaderbutton(false);
            navigate("/routine");
        })
    }

    const searchFilter = (e) => {
        setSearchFilterQuery(e.target.value);
        setExercises(unfilteredExercises.filter((ex) => ex.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    const dropdownFilter = (e) => {
        if (parseInt(e.target.value) === -1) setExercises(unfilteredExercises);
        else setExercises(unfilteredExercises.filter((ex) => parseInt(ex.muscleGroup) === parseInt(e.target.value)));
        setDropdownFilterQuery(e.target.value);
    }

    const exercisesDisplay = exercises.map(e => row(e));
    const options = muscleTypes.map(m => toDropdown(m));

    const submit = selectedExercises.length > 0 ? <div className="button-container submit-container"><LoaderButton buttonStyle="button-smaller" submit={onSubmit} show={showLoaderbutton}>Submit</LoaderButton></div> : <></>;

    if (loading) {
        return (
            <div className="workouts content">
                <h1>Workouts</h1>
                <Loader />
            </div>
        )
    }

    else {
        return (
            <div className="workouts content">
                <h1>Workouts</h1>
                <div className="filters-container">
                    <input type="text" placeholder="Search exercises" onChange={searchFilter} />
                    <select onChange={dropdownFilter} defaultValue={-1}>
                        <option value={-1}>All</option>
                        {options}
                    </select>
                </div>
                <div className="workouts-container">
                    {exercisesDisplay}
                </div>
                {submit}
            </div>
        )
    }
}

export { MuscleGroup, Workouts };