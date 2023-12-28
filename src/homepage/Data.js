import api from "../api";

const GetWorkoutsCount = () => {
    return api.get("workouts/count");
}

const GetMostRecentWorkouts = () => {
    return api.get("workouts/recent");
}

export { GetWorkoutsCount, GetMostRecentWorkouts };