import api from "../api";

const GetExercises = () => {
    return api.get("workouts");
}

const SearchExerciseMuscles = (muscleGroup) => {
    return api.get("workouts/search/" + muscleGroup);
}

export { GetExercises, SearchExerciseMuscles };