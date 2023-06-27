import api from "../api";

const GetRoutine = () => {
    return api.get("workouts/routine");
}

const UpdateRoutine = (routineId, setList) => {
    return api.put("workouts/routine/" + routineId, setList);
}

const RemoveExerciseFromRoutine = (setId) => {
    return api.delete("workouts/routine/set/" + setId);
}

const UpdateSetOrder = (setDict) => {
    return api.put("workouts/routine/set/order", setDict);
}

export { GetRoutine, UpdateRoutine, RemoveExerciseFromRoutine, UpdateSetOrder };