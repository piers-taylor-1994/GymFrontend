import api from "../api";

const GetExercises = () => {
    return api.get("workouts");
}

export { GetExercises };