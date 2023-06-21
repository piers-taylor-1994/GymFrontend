import api from "../api";

const GetRoutinesHistory = () => {
    return api.get("workouts/routine/history");
}

const GetRoutineHistory = (id) => {
    return api.get("workouts/routine/history/" + id);
}

export { GetRoutinesHistory, GetRoutineHistory };