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

const api = {
    get: function(url){
        return fetch(config.host + url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
    },
    put: function(url, request){
        return fetch(config.host + url, data("PUT", request))
        .then(response => {
            if (response.ok){
                return response.json();
            }
        })
    },
    post: function(url, request){
        return fetch(config.host + url, data("POST", request))
        .then(response => {
            if (response.ok){
                return response.json();
            }
        })
    },
    postText: function(url, request){
        return fetch(config.host + url, data("POST", request))
        .then(response => {
            if (response.ok){
                return response.text();
            }
        })
    },
    delete: function(url){
        return fetch(config.host + url, data("DELETE"))
        .then(response => {
            if (response.ok){
            }
        })
    }
}

export default api;