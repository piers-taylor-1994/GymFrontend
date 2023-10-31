import { useEffect, useRef, useState } from "react";
import { AddRoutine, AddRoutineTemplate, DeleteRoutineTemplate, EditRoutineTemplate, GetLastSetForExercises, GetRoutine, GetRoutineTemplateSets, GetRoutineTemplates } from "./Data";
import "./routine.scss";
import { Link, useNavigate } from "react-router-dom";
import { Loader, LoaderButton, Modal } from "../layout/Layout";
import DnD from "../layout/DnD";
import * as Icon from '../layout/Icons';
import { WorkoutsList } from "../workouts/Workouts";

function Routine() {
    const [routine, setRoutine] = useState([]);
    const [showLoaderbutton, setShowLoaderbutton] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dropdownLoading, setDropdownLoading] = useState(true);
    const [lastSets, setLastSets] = useState([]);
    const [routineTemplates, setRoutineTemplates] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState("default");
    const [modalType, setModalType] = useState(0);

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

        const tempShowError = () => {
            setShowError(true);
            
            setTimeout(() => {
                setShowError(false);
              }, 3000);
        }

        if (error) {
            tempShowError();
            setShowLoaderbutton(false);
        }

        else {
            AddRoutine(routine).then(response => {
                if (response === 400) {
                    tempShowError();
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

        let rowShow = routine.find((s) => s.exerciseId === exercise.exerciseId).exerciseArray.map((s, i) => toRow(exercise.exerciseId, i))

        return (
            <div style={{ ...props.styleCard, opacity }} data-handler-id={props.handlerId} className="set">
                <div ref={props.cardRef} className="icon-container"><Icon.Draggable /></div>
                <div className="set-data">
                    <div className="name-container">
                        <span className="exercise-name">{exercise.name}</span>
                        <div onClick={addRow}><Icon.AddSquare /></div>
                    </div>
                    {rowShow}
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
            <LoaderButton buttonStyle="button-s" submit={onSubmit} show={showLoaderbutton}>
                Submit
            </LoaderButton>
        </div>
    )

    const updateDisplayedSets = (id) => {
        GetRoutineTemplateSets(id).then((sets) => {
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

    const AddModalComponent = () => {
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
                    Template name:
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

    const EditModalComponent = () => {
        const [routineName, setRoutineName] = useState(routineTemplates.find((r) => r.id === selectedTemplateId).name);
        const [showModalLoaderButton, setShowModalLoaderButton] = useState(false);
        const [showError, setShowError] = useState(false);
        const [selectedExercises, setSelectedExercises] = useState(routine);

        const onEditSubmit = (e) => {
            setShowModalLoaderButton(true);

            if (!routineName) {
                setShowModalLoaderButton(false);
                setShowError(true);
            }

            else if (selectedExercises.length === 0) {
                setShowModalLoaderButton(false);
                setShowError(true);
            }

            else {
                let exerciseIds = [];
                selectedExercises.forEach(exercise => {
                    exerciseIds.push(exercise.exerciseId);
                });
                EditRoutineTemplate(selectedTemplateId, { name: routineName, exerciseIds: exerciseIds }).then((r) => {
                    setShowModalLoaderButton(false);
                    setRoutineTemplates(r);

                    let storedSets = JSON.parse(sessionStorage.getItem("routine"));
                    let setList = [];
                    selectedExercises.forEach(exercise => {
                        let exerciseArray = storedSets.find(e => e.exerciseId === exercise.exerciseId) && storedSets.find(e => e.exerciseId === exercise.exerciseId).exerciseArray
                            ? storedSets.find(e => e.exerciseId === exercise.exerciseId).exerciseArray
                            : [{
                                id: 0,
                                weight: null,
                                sets: null,
                                reps: null,
                                order: 0
                            }]
                        setList.push({
                            exerciseId: exercise.exerciseId,
                            name: exercise.name,
                            order: exercise.order,
                            exerciseArray: exerciseArray
                        })
                    });
                    setRoutine(setList);
                    setList.current = setList;
                    sessionStorage.setItem("routine", JSON.stringify(setList));

                    setModalShow(false);
                })
            }
        }

        const onDeleteSubmit = () => {
            DeleteRoutineTemplate(selectedTemplateId).then((r) => {
                setRoutineTemplates(r);
                sessionStorage.removeItem("routine");
                setSelectedTemplateId("default");
                setRoutine([]);
                setModalShow(false);
            })
        }

        let error = showError ? <span className="warning">Please fill in all the fields</span> : <br />;

        return (
            <Modal setShow={setModalShow}>
                <h2>Edit routine template</h2>
                <label>
                    Template name:
                    <input className="input" id="routineName" type="text" autoCapitalize="none" value={routineName} onChange={(e) => setRoutineName(e.target.value)} />
                </label>
                <br />
                <label>
                    Template exercises:
                    <WorkoutsList selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises} submit={onEditSubmit} className={"workouts"} />
                </label>
                {error}
                <div className="button-container button-container-bottom">
                    <LoaderButton buttonStyle="button-s" submit={onEditSubmit} show={showModalLoaderButton}>
                        Submit
                    </LoaderButton>
                    <div className="button button-xxxs button-red" onClick={onDeleteSubmit}><Icon.Rubbish /></div>
                </div>
            </Modal>
        )
    };

    const toDropdown = (routine) => {
        return (
            <option key={routine.id} value={routine.id}>{routine.name}</option>
        )
    }

    const onDropdownSelect = (e) => {
        setSelectedTemplateId(e.target.value);
        updateDisplayedSets(e.target.value);
    }

    const submit = routine && routine.length > 0 ? submitButton : <></>;
    const modal = modalShow ? modalType === 0 ? <AddModalComponent /> : <EditModalComponent /> : <></>;

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
        ? <div className="spinner spinner-smallest">&nbsp;</div>
        : (
            <select onChange={onDropdownSelect} value={selectedTemplateId}>
                <option value="default" disabled>Select</option>
                {options}
            </select>
        )
    const templateAdd = routine && routine.length > 0 ? <div onClick={() => { setModalType(0); setModalShow(true); }}><Icon.Add /></div> : <></>;
    const templateEdit = selectedTemplateId !== "default" ? <div onClick={() => { setModalType(1); setModalShow(true); }}><Icon.Edit /></div> : <></>;

    return (
        <div className="routine content">
            <div className="routine-template-container">
                {select}
                {templateAdd}
                {templateEdit}
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