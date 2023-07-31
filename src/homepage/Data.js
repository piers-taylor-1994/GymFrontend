import api from "../api";

const GetWorkoutsCount = () => {
    return api.get("workouts/count");
}

export { GetWorkoutsCount };