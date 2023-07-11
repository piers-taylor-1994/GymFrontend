import api from "../api";

const GetRoutine = () => {
    return api.get("workouts/routine");
}

const GetLastSetForExercises = (setList) => {
    return api.post("workouts/routine/last", setList);
}

const AddRoutine = (exercises) => {
    return api.post("workouts/routine", exercises);
}

const GetRoutineTemplates = () => {
    return api.get("workouts/routine/templates");
}

const GetRoutineTemplateSets = (id) => {
    return api.get("workouts/routine/template/" + id);
}

const AddRoutineTemplate = (routineTemplate) => {
    return api.post("workouts/routine/template/", routineTemplate);
}

export { GetRoutine, GetLastSetForExercises, AddRoutine, GetRoutineTemplates, GetRoutineTemplateSets, AddRoutineTemplate };