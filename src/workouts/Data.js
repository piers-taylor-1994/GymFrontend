import api from "../api";

const GetExercises = () => {
    return api.get("workouts");
}

const SearchExerciseMuscles = (muscleGroup) => {
    return api.get("workouts/search/" + muscleGroup);
}

const AddExercise = (exerciseName, exerciseMuscles, exerciseType) => {
    return api.post("workouts/add?name=" + exerciseName + "&type=" + exerciseType, exerciseMuscles, );
}

export { GetExercises, SearchExerciseMuscles, AddExercise };