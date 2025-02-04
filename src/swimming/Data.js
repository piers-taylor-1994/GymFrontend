import api from "../api";

const AddSwim = (time, length, happy, explanation) => {
    //return api.post("swimming/add?name=" + exerciseName, exerciseMuscles);
    return api.post("swimming/addswim?lengths=" + length + "&timeSwimming=" + time + "&review=" + happy + "&explanation=" + explanation);
}

const GetSwimCount = () => {
    return api.get("swimming/count")
}

const GetRecentSwims = () => {
    return api.get("swimming/recentswims");
}
const GetTodaysSwim = () => {
    return api.get("swimming/todaysswim")
}
export { AddSwim, GetSwimCount, GetRecentSwims, GetTodaysSwim }


