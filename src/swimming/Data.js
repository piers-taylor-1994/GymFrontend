import api from "../api";

const AddSwim = (time, length, happy, review) => {
    //return api.post("swimming/add?name=" + exerciseName, exerciseMuscles);
    return api.post();
}

export { AddSwim }