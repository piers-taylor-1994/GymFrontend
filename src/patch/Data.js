import api from "../api";

const SetPatchRead = (version) => {
    return api.post("patch/" + version);
}

const ResendToken = (username) => {
    return api.postText("auth/token/resend/" + username);
}

export { SetPatchRead, ResendToken };