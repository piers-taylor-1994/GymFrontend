import api from "../api";

const GetExercises = () => {
    return api.get("workouts");
}

const SearchExerciseMuscles = (muscleGroup) => {
    return api.get("workouts/search/" + muscleGroup);
}

const AddRoutine = (exerciseIds) => {
    return api.post("workouts/routine", exerciseIds);
}

export { GetExercises, SearchExerciseMuscles, AddRoutine };