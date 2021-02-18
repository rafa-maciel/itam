const { default: axios } = require("axios");

function filterURL(url) {
    return url.split('{')[0]
}

function apiInputHeaders() {
    return {
        headers: {
            Accept: 'application/json'
        }}
}

function getURLFromRel(rel) {
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

function apiNav(url) {
    url = filterURL(url)
    return axios.get(url)
        .then(response =>  response.data)
}

function apiPost(url, data) {
    url = filterURL(url)
    return axios.post(url, data, apiInputHeaders)
}

function apiUpdate(url, values) {
    url = filterURL(ulr)
    return axios.put(url, values, apiInputHeaders)
}

export {apiNav, apiPost, apiUpdate}