import api from "../api"

const GetLeaderboard = (exerciseId) => {
    return api.get("workouts/routine/leaderboard/" + exerciseId);
}

export { GetLeaderboard }