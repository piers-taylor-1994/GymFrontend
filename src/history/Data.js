import api from "../api";

const GetRoutinesHistory = (userId) => {
    return api.get("workouts/routine/history?userId=" + userId);
}

const GetRoutineHistory = (id) => {
    return api.get("workouts/routine/history/" + id);
}

export { GetRoutinesHistory, GetRoutineHistory };