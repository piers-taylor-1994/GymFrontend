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
            setList.current = JSON.parse(sessionStorage.getItem("routine"));
        }
        else {
            GetRoutine().then(routine => {
                if (routine) {
                    let setList = routine.exerciseSets;
                    setRoutine(setList);
                    setList.current = setList;
                    sessionStorage.setItem("routine", JSON.stringify(setList));
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
        if (routine.length > 0) {
            let routineExerciseIds = []
            routine.map((e) => routineExerciseIds.push(e.exerciseId));
            GetLastSetForExercises(routineExerciseIds).then((sets) => {
                setLastSets(sets);
            })
        }
    }, [routine])

    const onExerciseDataUpdate = (e, exerciseId, index) => {
        setList.current = [...routine];
        const input = setList.current.find(
            e => e.exerciseId === exerciseId
        )
        if (e.target.id === "weight") input.exerciseArray[index][e.target.id] = parseFloat(e.target.value);
        else input.exerciseArray[index][e.target.id] = parseInt(e.target.value);
        sessionStorage.setItem("routine", JSON.stringify(setList.current));
    }

    const onDelete = (exerciseId, index) => {
        let newRoutine = routine;
        newRoutine.find((r) => r.exerciseId === exerciseId).exerciseArray.splice(index, 1);
        if (routine.find((r) => r.exerciseId === exerciseId).exerciseArray.length === 0) newRoutine.splice(newRoutine.findIndex(r => r.exerciseId === exerciseId), 1);
        if (JSON.parse(sessionStorage.getItem("routine")) && JSON.parse(sessionStorage.getItem("routine")).length > 0) sessionStorage.setItem("routine", JSON.stringify(newRoutine));
        else sessionStorage.removeItem("routine");

        setRoutine((r) => {
            return [...r]
        })
    }

    const onExerciseOrderUpdate = (setDict) => {
        const updatedSetList = [...routine];
        for (const [key, value] of Object.entries(setDict)) {
            updatedSetList.find(t => t.exerciseId === key).order = value;
        }
        sessionStorage.setItem("routine", JSON.stringify(updatedSetList));
        setList.current = updatedSetList;
    }

    const onSubmit = () => {
        setShowLoaderbutton(true);

        routine.forEach(r => {
            setList.current.forEach(s => {
                if (r.exerciseId === s.exerciseId && r.order === s.order) {
                    r.weight = s.weight;
                    r.sets = s.sets;
                    r.reps = s.reps;
                }
            });
        });

        let error = false;

        routine.forEach(exercise => {
            exercise.exerciseArray.forEach(s => {
                if (s.weight === null || !s.sets || !s.reps) error = true;
            });
        });

        if (error) {
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
                    navigate("/history/" + response);
                }
            });
        }
    }

    const SetCard = (props) => {
        const opacity = props.isDragging ? 0.5 : 1;
        const exercise = props.card;
        // const [rows, setRows] = useState(routine.find((s) => s.exerciseId === exercise.exerciseId).exerciseArray.length);
        // const [newRow, setNewRow] = useState(0);
        const lastExercise = lastSets ? lastSets.find(t => t.exerciseId === exercise.exerciseId) : {};

        const toRow = (exerciseId, index) => {
            return (
                <div className="row" key={index}>
                    <label>
                        <input id="weight" type="number" defaultValue={exercise.exerciseArray[index].weight || exercise.exerciseArray[index].weight === 0 ? exercise.exerciseArray[index].weight : null} placeholder={lastExercise ? lastExercise.weight : null} onChange={e => { onExerciseDataUpdate(e, exerciseId, index) }} />
                        kg
                    </label>
                    <label>
                        <input id="sets" type="number" defaultValue={exercise.exerciseArray[index].sets ? exercise.exerciseArray[index].sets : null} placeholder={lastExercise ? lastExercise.sets : null} onChange={e => { onExerciseDataUpdate(e, exerciseId, index) }} />
                        sets
                    </label>
                    <label>
                        <input id="reps" type="number" defaultValue={exercise.exerciseArray[index].reps ? exercise.exerciseArray[index].reps : null} placeholder={lastExercise ? lastExercise.reps : null} onChange={e => { onExerciseDataUpdate(e, exerciseId, index) }} />
                        reps
                    </label>
                    <div className="delete-container" onClick={() => onDelete(exercise.exerciseId, index)}><Icon.Close /></div>
                </div>
            )
        }

        const addRow = () => {
            let exerciseIndex = routine.findIndex((s) => s.exerciseId === exercise.exerciseId);
            let newRoutine = routine;
            newRoutine[exerciseIndex].exerciseArray.push({
                weight: exercise.weight ? exercise.weight : null,
                sets: exercise.weight ? exercise.weight : null,
                reps: exercise.weight ? exercise.weight : null,
                order: routine[exerciseIndex].exerciseArray.length
            })
            setRoutine(() => { return [...newRoutine] });
            sessionStorage.setItem("routine", JSON.stringify(newRoutine));
        }

        // let arrayCount = routine.find((s) => s.exerciseId === exercise.exerciseId).exerciseArray.length;
        let rowShow = routine.find((s) => s.exerciseId === exercise.exerciseId).exerciseArray.map((s, i) => toRow(exercise.exerciseId, i))

        // for (let index = arrayCount; index < rows; index++) {
        //     let exerciseIndex = routine.findIndex((s) => s.exerciseId === exercise.exerciseId);
        //     routine[exerciseIndex].exerciseArray.push({
        //         weight: exercise.weight ? exercise.weight : null,
        //         sets: exercise.weight ? exercise.weight : null,
        //         reps: exercise.weight ? exercise.weight : null,
        //         order: routine[exerciseIndex].exerciseArray.length
        //     })
        //     setRoutine(() => { return routine });
        //     sessionStorage.setItem("routine", JSON.stringify(routine));
        //     setNewRow((n) => { return (n + 1) })
        // }

        return (
            <div ref={props.cardRef} style={{ ...props.styleCard, opacity }} data-handler-id={props.handlerId}>
                <div className="name-container">
                    <span className="exercise-name">{exercise.name}</span>
                    <div onClick={addRow}><Icon.AddSquare /></div>
                </div>
                {rowShow}
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
            <LoaderButton buttonStyle="button-s" submit={onSubmit} show={showLoaderbutton}>
                Submit
            </LoaderButton>
        </div>
    )

    const ModalComponent = () => {
        const [routineName, setRoutineName] = useState("");
        const [showModalLoaderButton, setShowModalLoaderButton] = useState(false);
        const [showError, setShowError] = useState(false);

        const onModalSubmit = (e) => {
            setShowModalLoaderButton(true);

            if (!routineName) {
                setShowModalLoaderButton(false);
                setShowError(true);
            }

            else {
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
        }

        let error = showError ? <span className="warning">Please fill in all the fields</span> : <br />;

        return (
            <Modal setShow={setModalShow}>
                <h2>Add routine template</h2>
                <label>
                    Routine template name:
                    <input className="input" id="routineName" type="text" autoCapitalize="none" onChange={(e) => setRoutineName(e.target.value)} />
                    <br />
                    <div className="button-container button-container-bottom">
                        {error}
                        <LoaderButton buttonStyle="button-s" submit={onModalSubmit} show={showModalLoaderButton}>
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
            let setList = [];
            for (let i = 0; i < sets.length; i++) {
                let ex = sets[i];
                setList.push({
                    exerciseId: ex.exerciseId,
                    name: ex.name,
                    order: i,
                    exerciseArray: [{
                        id: 0,
                        weight: null,
                        sets: null,
                        reps: null,
                        order: 0
                    }]
                });
            }

            setRoutine(setList);
            setList.current = setList;
            sessionStorage.setItem("routine", JSON.stringify(setList));
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