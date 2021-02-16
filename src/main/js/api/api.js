const { default: axios } = require("axios");
export function getURLFromRel(rel) {
    return axios.get("/api")
        .then(response => response.data._links)
        .then(items => items[rel])
        .then(url => {
            if (url.templated) {
                url.href = url.href.split('{')[0]
            }
            return url
        })
}

export function apiNav(url) {
    return axios.get(url)
        .then(response =>  response.data)
}

export function apiPost(url, data) {
    url = url.split('{')[0]
    return axios.post(url, data, {headers:{Accept: 'application/json'}})
}