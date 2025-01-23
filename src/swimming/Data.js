import api from "../api";

const AddSwim = (time, length, happy, explanation) => {
    //return api.post("swimming/add?name=" + exerciseName, exerciseMuscles);
    return api.post("swimming/addswim?lengths=" + length + "&timeSwimming=" + time + "&review=" + happy + "&explanation=" + explanation);
}

export { AddSwim }

