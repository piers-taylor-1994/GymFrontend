import api from "../api";

const SetToken = (token) => {
    return api.put("booking/token/" + token);
}

export { SetToken };