import api from "../../api";

const GetRoutine = (userId) => {
    return api.get("workouts/routine?userId=" + userId);
}

export default GetRoutine;