import api from "../api";

const GetPatchRead = () => {
    return api.get("patch");
}

const SetPatchRead = () => {
    return api.post("patch");
}

export { GetPatchRead, SetPatchRead };