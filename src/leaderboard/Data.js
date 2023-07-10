import api from "../api"

const GetLeaderboard = (exerciseId) => {
    return api.get("workouts/routine/leaderboard/" + exerciseId);
}

const DataExport = () => {
    return api.postPdf("workouts/export");
}

export { GetLeaderboard, DataExport }