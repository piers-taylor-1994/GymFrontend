import api from "./api";

const GetUsers = () => {
    return api.get("auth");
}

export { GetUsers };