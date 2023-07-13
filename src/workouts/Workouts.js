import { useEffect, useState } from "react";
import { GetExercises, SearchExerciseMuscles } from "./Data";
import './workouts.scss';
import { useNavigate } from "react-router-dom";
import { GetRoutine } from "../routine/Data";
import { Loader, LoaderButton } from "../layout/Layout";

const MuscleGroup = {
    0: "Shoulders",
    1: "Chest",
    2: "Triceps",
    3: "Biceps",
    4: "Upper-back",
    5: "Lower-back",
    6: "Core",
    7: "Glutes",
    8: "Hips",
    9: "Quads",
    10: "Hamstrings",
    11: "Calves",
    12: "Thighs"
}
Object.freeze(MuscleGroup);

function Workouts(props) {
    const [unfilteredExercises, setUnfilteredExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [showLoaderbutton, setShowLoaderbutton] = useState(false);
    const [loading, setLoading] = useState(true);

    const [searchFilterQuery, setSearchFilterQuery] = useState("");
    const [dropdownFilterQuery, setDropdownFilterQuery] = useState(-1);
    const [searchedArray, setSearchedArray] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("routine")) && JSON.parse(sessionStorage.getItem("routine")).length > 0) {
            setSelectedExercises(JSON.parse(sessionStorage.getItem("routine")));
        }
        else {
            GetRoutine().then(routine => {
                if (routine) {
                    setSelectedExercises(routine.setList);
                }
            })
        }
    }, [])

    useEffect(() => {
        GetExercises().then(exercises => {
            exercises.sort((a, b) => {
                const nameA = MuscleGroup[a.muscleGroup].toUpperCase();
                const nameB = MuscleGroup[b.muscleGroup].toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            setExercises(exercises);
            setUnfilteredExercises(exercises);
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (parseInt(dropdownFilterQuery) !== -1 && searchFilterQuery) {
            setExercises(unfilteredExercises.filter((ex) => searchedArray.includes(ex.exerciseId) && ex.name.toLowerCase().includes(searchFilterQuery.toLowerCase())));
        }
        else if (parseInt(dropdownFilterQuery) !== -1) {
            setExercises(unfilteredExercises.filter((ex) => searchedArray.includes(ex.exerciseId) && ex.name.toLowerCase().includes(searchFilterQuery.toLowerCase())));
        }
        else if (searchFilterQuery) setExercises(unfilteredExercises.filter((ex) => ex.name.toLowerCase().includes(searchFilterQuery.toLowerCase())));
    }, [unfilteredExercises, searchFilterQuery, dropdownFilterQuery, searchedArray])

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

    const toDropdown = (m, i) => {
        return (
            <option value={i} key={i}>{m}</option>
        )
    }

    const onSubmit = () => {
        setShowLoaderbutton(true);
        let selectedExerciseObjects = [];
        for (let i = 0; i < selectedExercises.length; i++) {
            selectedExerciseObjects.push({
                exerciseId: selectedExercises[i].exerciseId,
                name: selectedExercises[i].name,
                weight: selectedExercises[i].weight ? parseFloat(selectedExercises[i].weight) : null,
                sets: selectedExercises[i].sets ? selectedExercises[i].sets : null,
                reps: selectedExercises[i].reps ? selectedExercises[i].reps : null,
                order: i
            });
        }
        let storedRoutine = JSON.parse(sessionStorage.getItem("routine"));
        if (storedRoutine && storedRoutine.length > 0) {
            selectedExerciseObjects.forEach(n => {
                storedRoutine.forEach(s => {
                    if (n.exerciseId === s.exerciseId) {
                        n.weight = s.weight;
                        n.sets = s.sets;
                        n.reps = s.reps;
                    }
                });
            });
        }
        sessionStorage.setItem("routine", JSON.stringify(selectedExerciseObjects));
        setShowLoaderbutton(false);
        navigate("/routine");
    }

    const searchFilter = (e) => {
        if (e.target.value === "" && parseInt(dropdownFilterQuery) === -1) setExercises(unfilteredExercises);
        setSearchFilterQuery(e.target.value);
    }

    const dropdownFilter = (e) => {
        if (parseInt(e.target.value) === -1) setExercises(unfilteredExercises);
        else {
            setLoading(true);
            SearchExerciseMuscles(e.target.value).then((se) => {
                setSearchedArray(se);
                setLoading(false);
            })
        }
        setDropdownFilterQuery(e.target.value);
    }

    const exercisesDisplay = exercises.map(e => row(e));
    const options = Object.values(MuscleGroup).map((m, i) => toDropdown(m, i));

    const submit = selectedExercises.length > 0 ? <div className="button-container submit-container"><LoaderButton buttonStyle="button-smaller" submit={onSubmit} show={showLoaderbutton}>Submit</LoaderButton></div> : <></>;

    const display = loading
        ? <Loader />
        : <>
            <div className="workouts-container">
                {exercisesDisplay}
            </div>
            {submit}
        </>;

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
            {display}
        </div>
    )
}

export { MuscleGroup, Workouts };