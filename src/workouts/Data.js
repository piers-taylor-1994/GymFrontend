import api from "../api";

const GetExercises = () => {
    return api.get("workouts");
}

const SearchExerciseMuscles = (muscleGroup) => {
    return api.get("workouts/search/" + muscleGroup);
}

const AddExercise = (exerciseName, exerciseMuscles) => {
    return api.post("workouts/add?name=" + exerciseName, exerciseMuscles);
}

export { GetExercises, SearchExerciseMuscles, AddExercise };