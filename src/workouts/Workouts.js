import { useEffect, useState } from "react";
import { AddExercise, GetExercises, SearchExerciseMuscles } from "./Data";
import './workouts.scss';
import { useNavigate } from "react-router-dom";
import { GetRoutine } from "../routine/Data";
import { Loader, LoaderButton, Modal } from "../layout/Layout";

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

function WorkoutsList(props) {
    const [unfilteredExercises, setUnfilteredExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchFilterQuery, setSearchFilterQuery] = useState("");
    const [dropdownFilterQuery, setDropdownFilterQuery] = useState(-1);
    const [searchedArray, setSearchedArray] = useState([]);

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        GetExercises().then(exercises => {
            exercises.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
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

    const ModalComponent = () => {
        const [exerciseName, setExerciseName] = useState(searchFilterQuery);
        const [muscles, setMuscles] = useState([]);
        const [showModalLoaderButton, setShowModalLoaderButton] = useState(false);
        const [showError, setShowError] = useState(false);

        const onCheck = (e, i) => {
            if (e.target.checked) setMuscles((m) => {
                return [...m, i]
            })
            else {
                setMuscles(muscles.filter((m) => m !== i));
            }
        }

        const toCheckbox = (m, i) => {
            return (
                <label key={i}>
                    {m}
                    <input type="checkbox" value={i} onChange={(e) => onCheck(e, i)} />
                </label>
            )
        }

        const onModalSubmit = (e) => {
            setShowModalLoaderButton(true);

            if (!exerciseName || muscles.length === 0) {
                setShowModalLoaderButton(false);
                setShowError(true);
            }
            else {
                AddExercise(exerciseName, muscles).then((e) => {
                    if (e) setExercises((exercises) => {
                        return [...exercises, e];
                    })

                    setShowModalLoaderButton(false);
                    setModalShow(false);
                })
            }
        }

        let checkBoxes = Object.values(MuscleGroup).map((m, i) => toCheckbox(m, i));
        let error = showError ? <span className="warning">Please fill in all the fields</span> : <br />;

        return (
            <Modal setShow={setModalShow}>
                <h2>Add exercise</h2>
                <label>
                    Exercise name:
                    <input className="input" id="exerciseName" type="text" spellCheck="true" defaultValue={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
                </label>
                <h3>Muscles</h3>
                <div className="checkbox-container">
                    {checkBoxes}
                </div>
                <div className="button-container button-container-bottom">
                    {error}
                    <LoaderButton buttonStyle="button-s" submit={onModalSubmit} show={showModalLoaderButton}>
                        Submit
                    </LoaderButton>
                </div>
            </Modal>
        )
    }

    const onCheck = (e, exercise) => {
        if (e.target.checked) {
            props.setSelectedExercises((se) => {
                return [...se, exercise];
            })
        }
        else {
            props.setSelectedExercises(props.selectedExercises.filter((s) => s.exerciseId !== exercise.exerciseId));
        }
    }

    const row = (exercise) => {
        return (
            <div key={exercise.exerciseId} className="row">
                <p>{exercise.name}</p>
                <input type="checkbox" checked={props.selectedExercises.some(s => s.exerciseId === exercise.exerciseId)} onChange={(e) => onCheck(e, exercise)} />
            </div>
        )
    }

    const toDropdown = (m, i) => {
        return (
            <option value={i} key={i}>{m}</option>
        )
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

    const header = props.enableAddingExercises ? <h1>Workouts</h1> : <></>;

    const display = loading
        ? <Loader />
        : exercises.length === 0 && props.enableAddingExercises
            ? <div className="button-container"><button className="button button-xs" onClick={() => setModalShow(true)}>Add exercise</button></div>
            : <>{exercisesDisplay}</>;

    const modal = modalShow ? <ModalComponent /> : <></>;

    return (
        <div className={props.className}>
            {header}
            <div className="filters-container">
                <input type="text" placeholder="Search exercises" onChange={searchFilter} />
                <select onChange={dropdownFilter} defaultValue={-1}>
                    <option value={-1}>All</option>
                    {options}
                </select>
            </div>
            <div className="workouts-container">
                {display}
            </div>
            {modal}
        </div>
    )
}

function Workouts(props) {
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [showLoaderbutton, setShowLoaderbutton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("routine")) && JSON.parse(sessionStorage.getItem("routine")).length > 0) {
            setSelectedExercises(JSON.parse(sessionStorage.getItem("routine")));
        }
        else {
            GetRoutine(0).then(routine => {
                if (routine) {
                    setSelectedExercises(routine.exerciseSets);
                }
            })
        }
    }, [])

    const onSubmit = () => {
        setShowLoaderbutton(true);
        let selectedExerciseObjects = [];
        for (let i = 0; i < selectedExercises.length; i++) {
            selectedExerciseObjects.push({
                exerciseId: selectedExercises[i].exerciseId,
                name: selectedExercises[i].name,
                order: i,
                exerciseArray: selectedExercises[i].exerciseArray ? selectedExercises[i].exerciseArray : [{
                    weight: null,
                    sets: null,
                    reps: null,
                    order: 0
                }]
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

    const submit = selectedExercises.length > 0 ? <div className="button-container submit-container"><LoaderButton buttonStyle="button-s" submit={onSubmit} show={showLoaderbutton}>Submit</LoaderButton></div> : <></>;

    return (
        <>
            <WorkoutsList selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises} submit={onSubmit} className={"workouts content"} enableAddingExercises={true} />
            {submit}
        </>
    )
}

export { MuscleGroup, Workouts, WorkoutsList };