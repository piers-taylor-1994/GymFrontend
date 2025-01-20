import config from './config';
const Fetch = require('fetch-retry')(fetch);
// const Fetch = require('fetch-retry')(fetch, { retryOn: function(attempt, error, response) {
//     // retry on any network error, or 4xx or 5xx status codes
//     if (error !== null || response.status >= 400) {
//       console.log(`retrying, attempt number ${attempt + 1}`);
//       return true;
//     } 
// }});

const auth = (method) => {
    const jwt = localStorage.getItem("jwt");

    if (navigator.serviceWorker.controller !== null) {
        navigator.serviceWorker.controller.postMessage({
            type: 'STORE-TOKEN',
            token: jwt
        });
    }

    return {
        method: method,
        withCredentials: true,
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt
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
        return Fetch(config.host + url, auth("GET"))
            .then(response => {
                if (err(response)) {
                    return response.json();
                }
            })
    },
    put: function (url, request) {
        return Fetch(config.host + url, data("PUT", request))
            .then(response => {
                if (err(response)) {
                    return response.text();
                }
                else {
                    return response.status;
                }
            })
    },
    post: function (url, request) {
        return Fetch(config.host + url, data("POST", request))
            .then(response => {
                if (err(response)) {
                    return response.json();
                }
                else {
                    return response.status;
                }
            })
    },
    postText: function (url, request) {
        return Fetch(config.host + url, data("POST", request))
            .then(response => {
                if (err(response)) {
                    return response.text();
                }
            })
    },
    delete: function (url) {
        return Fetch(config.host + url, data("DELETE"))
            .then(response => {
                if (err(response)) {
                    return response.json();
                }
                else {
                    return response.status;
                }
            })
    }
}

export default api;