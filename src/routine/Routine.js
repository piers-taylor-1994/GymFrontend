import { useEffect, useRef, useState } from "react";
import { AddRoutine, AddRoutineTemplate, GetLastSetForExercises, GetRoutine, GetRoutineTemplateSets, GetRoutineTemplates } from "./Data";
import "./routine.scss";
import { Link, useNavigate } from "react-router-dom";
import { Loader, LoaderButton, Modal } from "../layout/Layout";
import DnD from "../layout/DnD";
import * as Icon from '../layout/Icons';

function Routine() {
    const [routine, setRoutine] = useState([]);
    const [showLoaderbutton, setShowLoaderbutton] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dropdownLoading, setDropdownLoading] = useState(true);
    const [lastSets, setLastSets] = useState([]);
    const [routineTemplates, setRoutineTemplates] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate();
    const setList = useRef([]);

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("routine")) && JSON.parse(sessionStorage.getItem("routine")).length > 0) {
            setRoutine(JSON.parse(sessionStorage.getItem("routine")));
            setLoading(false);
        }
        else {
            GetRoutine().then(routine => {
                if (routine) {
                    setRoutine(routine.setList);
                }
                setLoading(false);
            })
        }
        GetRoutineTemplates().then((templates) => {
            setRoutineTemplates(templates);
            setDropdownLoading(false);
        })
    }, [])

    useEffect(() => {
        if (routine) {
            let routineExerciseIds = []
            routine.map((r) => routineExerciseIds.push(r.exerciseId));
            GetLastSetForExercises(routineExerciseIds).then((sets) => {
                setLastSets(sets);
            })
        }
    }, [routine])

    const onExerciseDataUpdate = (e, exerciseId) => {
        setList.current = [...routine];
        const input = setList.current.find(
            e => e.exerciseId === exerciseId
        )
        if (e.target.id === "weight") input[e.target.id] = parseFloat(e.target.value);
        else input[e.target.id] = parseInt(e.target.value);
        sessionStorage.setItem("routine", JSON.stringify(setList.current));
    }

    const onDelete = (exerciseId) => {
        if (JSON.parse(sessionStorage.getItem("routine")) && JSON.parse(sessionStorage.getItem("routine")).length > 1) sessionStorage.setItem("routine", JSON.stringify(routine.filter((r) => r.exerciseId !== exerciseId)));
        else sessionStorage.removeItem("routine");
        setRoutine(routine.filter((r) => r.exerciseId !== exerciseId));
    }

    const onExerciseOrderUpdate = (setDict) => {
        const setList = [...routine];
        for (const [key, value] of Object.entries(setDict)) {
            setList.find(t => t.exerciseId === key).order = value;
        }
        sessionStorage.setItem("routine", JSON.stringify(setList));
        setRoutine(setList);
    }

    const onSubmit = () => {
        setShowLoaderbutton(true);

        routine.forEach(r => {
            setList.current.forEach(s => {
                if (r.exerciseId === s.exerciseId) {
                    r.weight = s.weight;
                    r.sets = s.sets;
                    r.reps = s.reps;
                }
            });
        });

        if (routine.find(r => !r.weight || !r.sets || !r.reps)) {
            setShowError(true);
            setShowLoaderbutton(false);
        }

        else {
            AddRoutine(routine).then(response => {
                if (response === 400) {
                    setShowError(true);
                    setShowLoaderbutton(false);
                }
                else {
                    sessionStorage.removeItem("routine");
                    setShowLoaderbutton(false);
                    navigate("/history/" + response.id);
                }
            });
        }
    }

    const SetCard = (props) => {
        const opacity = props.isDragging ? 0.5 : 1;
        const exercise = props.card;
        const lastExercise = lastSets ? lastSets.find(t => t.exerciseId === exercise.exerciseId) : {};

        return (
            <div ref={props.cardRef} style={{ ...props.styleCard, opacity }} data-handler-id={props.handlerId} className="set">
                <div>
                    <span className="exercise-name">{exercise.name}</span>
                </div>
                <div className="row">
                    <label>
                        <input id="weight" type="number" defaultValue={exercise.weight ? exercise.weight : null} placeholder={lastExercise ? lastExercise.weight : null} onChange={e => { onExerciseDataUpdate(e, exercise.exerciseId) }} />
                        kg
                    </label>
                    <label>
                        <input id="sets" type="number" defaultValue={exercise.sets ? exercise.sets : null} placeholder={lastExercise ? lastExercise.sets : null} onChange={e => { onExerciseDataUpdate(e, exercise.exerciseId) }} />
                        sets
                    </label>
                    <label>
                        <input id="reps" type="number" defaultValue={exercise.reps ? exercise.reps : null} placeholder={lastExercise ? lastExercise.reps : null} onChange={e => { onExerciseDataUpdate(e, exercise.exerciseId) }} />
                        reps
                    </label>
                    <div className="delete-container" onClick={() => onDelete(exercise.exerciseId)}><Icon.Close /></div>
                </div>
            </div>
        )
    }

    const error = showError ? <span className="warning">Please fill in all fields before submitting</span> : <></>;

    function Sets(props) {
        const sets = routine && routine.length > 0 ? <DnD array={routine} component={SetCard} update={onExerciseOrderUpdate} /> : <p>A routine for today hasn't been added yet. <Link to="/workouts">Please add one.</Link></p>;

        if (loading) {
            return (
                <div className="sets">
                    <Loader />
                </div>
            )
        }

        else {
            return (
                <div className="sets">
                    {sets}
                </div>
            )
        }
    }

    const submitButton = (
        <div className="button-container submit-container">
            {error}
            <LoaderButton buttonStyle="button-smaller" submit={onSubmit} show={showLoaderbutton}>
                Submit
            </LoaderButton>
        </div>
    )

    const ModalComponent = () => {
        const [routineName, setRoutineName] = useState("");
        const [showModalLoaderButton, setShowModalLoaderButton] = useState(false);

        const onModalSubmit = (e) => {
            setShowModalLoaderButton(true);
            let exerciseIds = [];
            routine.forEach(exercise => {
                exerciseIds.push(exercise.exerciseId);
            });
            AddRoutineTemplate({ name: routineName, exerciseIds: exerciseIds }).then((rt) => {
                setShowModalLoaderButton(false);
                setModalShow(false);
                setRoutineTemplates((rts) => {
                    return [...rts, rt];
                })
            })
        }

        return (
            <Modal setShow={setModalShow}>
                <h2>Add routine template</h2>
                    <label>
                        Routine template name:
                        <input className="input" id="routineName" type="text" autoCapitalize="none" onChange={(e) => setRoutineName(e.target.value)} />
                        <br />
                        <div className="button-container button-container-bottom">
                            <LoaderButton buttonStyle="button-smaller" submit={onModalSubmit} show={showModalLoaderButton}>
                                Submit
                            </LoaderButton>
                        </div>
                    </label>
            </Modal>
        )
    };

    const toDropdown = (routine) => {
        return (
            <option key={routine.id} value={routine.id}>{routine.name}</option>
        )
    }

    const onDropdownSelect = (e) => {
        GetRoutineTemplateSets(e.target.value).then((sets) => {
            for (let i = 0; i < sets.length; i++) {
                const set = sets[i];
                set.order = i
            }
            sessionStorage.setItem("routine", JSON.stringify(sets));
            setRoutine(sets);
        })
    }

    const submit = routine && routine.length > 0 ? submitButton : <></>;
    const modal = modalShow ? <ModalComponent /> : <></>;

    const options = routineTemplates.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }).map(r => toDropdown(r));

    const select = dropdownLoading
        ? <div className="spinner">&nbsp;</div>
        : (
            <select onChange={onDropdownSelect} defaultValue="default">
                <option value="default" disabled>Select</option>
                {options}
            </select>
        )
    const templateAdd = routine && routine.length > 0 ? <div onClick={() => setModalShow(true)}><Icon.Add /></div> : <></>;

    return (
        <div className="routine content">
            <div className="routine-template-container">
                {select}
                {templateAdd}
            </div>
            <h1>Routine</h1>
            {routine && routine.length > 0 ? <span className="blurb">Drag and drop to re-order</span> : <></>}
            <Sets />
            {submit}
            {modal}
        </div>
    )
}

export default Routine;