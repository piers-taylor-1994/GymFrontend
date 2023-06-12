import api from "../../api";

const GetRoutine = (userId) => {
    return api.get("workouts/routine?userId=" + userId);
}

const UpdateRoutine = (routineId, setList) => {
    return api.put("workouts/routine/" + routineId, setList);
}

export { GetRoutine, UpdateRoutine };