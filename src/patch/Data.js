import api from "../api";

async function SetPatchRead (version) {
    return api.post("patch/" + version);
}

async function ResendToken (username) {
    return api.postText("auth/token/resend/" + username);
}

export { SetPatchRead, ResendToken };