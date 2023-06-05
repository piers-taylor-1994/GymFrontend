import api from "../api";

const Logon = (username, password) => {
    return api.postText("auth/logon", {username, password});
}

export { Logon };