import api from "../api";

const GetRoutinesHistory = (submissionType) => {
    return api.get("workouts/routine/history?submissionType=" + submissionType);
}

const GetRoutineHistory = (id, submissionType) => {
    return api.get("workouts/routine/history/".concat(id, "?submissionType=", submissionType));
}

const AddGhostData = (routineId, date) => {
    return api.post("workouts/ghost", {routineId: routineId, date: date});
}

export { GetRoutinesHistory, GetRoutineHistory, AddGhostData };