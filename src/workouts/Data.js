import api from "../api";

const GetExercises = () => {
    return api.get("workouts");
}

const AddRoutine = (exerciseIds) => {
    return api.post("workouts/routine", exerciseIds);
}

export { GetExercises, AddRoutine };