import config from './config';

const auth = (method) => {
    const jwt = localStorage.getItem("jwt");
    if (navigator.serviceWorker.controller === null) {
        return {
            method: method,
            withCredentials: true,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            }
        }
    } else {
        navigator.serviceWorker.controller.postMessage({
            type: 'STORE-TOKEN',
            token: jwt
        });
        return {
            method: method,
            withCredentials: true,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }
    }
}

const err = (response) => {
    if (response.status === 204) return false;

    if (response.ok) return true;

    if (response.status === 401) {
        localStorage.removeItem("jwt");
        if (navigator.serviceWorker.controller !== null) {
            navigator.serviceWorker.controller.postMessage({
                type: 'CLEAR-TOKEN'
            });
        }
    }

    return false;
}

const data = (method, request) => {
    const info = auth(method);
    info.body = JSON.stringify(request);

    return info;
}

const api = {
    get: function (url) {
        return fetch(config.host + url, auth("GET"))
            .then(response => {
                if (err(response)) {
                    return response.json();
                }
            })
    },
    put: function (url, request) {
        return fetch(config.host + url, data("PUT", request))
            .then(response => {
                if (err(response)) {
                    return response.json();
                }
            })
    },
    post: function (url, request) {
        return fetch(config.host + url, data("POST", request))
            .then(response => {
                if (err(response)) {
                    return response.json();
                }
            })
    },
    postText: function (url, request) {
        return fetch(config.host + url, data("POST", request))
            .then(response => {
                if (err(response)) {
                    return response.text();
                }
            })
    },
    delete: function (url) {
        return fetch(config.host + url, data("DELETE"))
            .then(response => {
                if (err(response)) {
                }
            })
    }
}

export default api;