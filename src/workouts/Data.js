import api from "../api";

const GetExercises = () => {
    return api.get("workouts");
}

const AddRoutine = (userId, exerciseIds) => {
    return api.post("workouts/routine?userId=" + userId, exerciseIds);
}

export { GetExercises, AddRoutine };