import api from "../api";

const GetRoutine = () => {
    return api.get("workouts/routine");
}

const UpdateRoutine = (routineId, setList) => {
    return api.put("workouts/routine/" + routineId, setList);
}

export { GetRoutine, UpdateRoutine };