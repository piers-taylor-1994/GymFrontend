import config from './config';

const data = (method, request) => {
    return {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }
}

const err = (response) => {
    if (response.status === 204) return false;

    if (response.ok) return true;

    if (response.status === 401) localStorage.removeItem("jwt");

    return false;
}

const api = {
    get: function(url){
        return fetch(config.host + url)
            .then(response => {
                if (err(response)) {
                    return response.json();
                }
            })
    },
    put: function(url, request){
        return fetch(config.host + url, data("PUT", request))
        .then(response => {
            if (err(response)) {
                return response.json();
            }
        })
    },
    post: function(url, request){
        return fetch(config.host + url, data("POST", request))
        .then(response => {
            if (err(response)) {
                return response.json();
            }
        })
    },
    postText: function(url, request){
        return fetch(config.host + url, data("POST", request))
        .then(response => {
            if (err(response)) {
                return response.text();
            }
        })
    },
    delete: function(url){
        return fetch(config.host + url, data("DELETE"))
        .then(response => {
            if (err(response)) {
            }
        })
    }
}

export default api;