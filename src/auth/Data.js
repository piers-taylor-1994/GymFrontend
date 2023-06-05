import api from "../api";

const Logon = (username, password) => {
    return api.post("auth/logon", {username, password});
}

export { Logon };