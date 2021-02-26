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

function apiNavMany(urls) {
    urls = urls.map(url => filterURL(url))

    return axios.all(urls.map(url => axios.get(url)))
            .then(axios.spread((...responses) => {
                return responses
            }))
}

function apiNav(url) {
    url = filterURL(url)
    return axios.get(url)
        .then(response =>  response.data)
}

function apiNavParam(url, params) {
    url = filterURL(url)
    return axios.get(url, {params})
        .then(response =>  response.data)
}

function apiPost(url, data) {
    url = filterURL(url)
    return axios.post(url, data, apiInputHeaders)
}

function apiUpdate(url, values) {
    url = filterURL(url)
    return axios.patch(url, values, apiInputHeaders)
}

export {apiNav, apiPost, apiUpdate, getURLFromRel, apiNavMany, apiNavParam}