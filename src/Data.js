import api from "./api";

const GetUsers = () => {
    return api.get("auth");
}

const GetUser = () => {
    return api.get("auth/user");
}

export { GetUsers, GetUser };