import api from "../api";

const GetRoutine = () => {
    return api.get("workouts/routine");
}

const UpdateSetOrder = (setDict) => {
    return api.put("workouts/routine/set/order", setDict);
}

const GetLastSetForExercises = (setList) => {
    return api.post("workouts/routine/last", setList);
}

const AddRoutine = (exercises) => {
    return api.post("workouts/routine", exercises);
}

export { GetRoutine, UpdateSetOrder, GetLastSetForExercises, AddRoutine };