const { default: axios } = require("axios");

function filterURL(url) {
    return url.split('{')[0]
}

function apiInputHeaders(params) {
    return {
        params,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ITAM_TOKEN_AUTH'),
            Accept: 'application/json'
        }}
}

function apiInputSchemaHeaders() {
    return {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ITAM_TOKEN_AUTH'),
            Accept: 'application/schema+json'
        }}
}

function getURLFromRel(rel) {
    return axios.get("/api", apiInputHeaders)
        .then(response => response.data._links)
        .then(items => items[rel])
        .then(url => {
            if (url.templated) {
                url.href = url.href.split('{')[0]
            }
            return url
        })
}

function getURLFromEntitySearch(url, rel) {
    let searchUrl = filterURL(url) + "/search"
    return apiNav(searchUrl)
        .then(data => data._links[rel].href)
}

function apiNavMany(urls) {
    urls = urls.map(url => filterURL(url))

    return axios.all(urls.map(url => axios.get(url, apiInputHeaders())))
            .then(axios.spread((...responses) => {
                return responses
            }))
}

function apiNav(url) {
    url = filterURL(url)
    return axios.get(url, apiInputHeaders())
        .then(response =>  response.data)
}

function apiNavParam(url, params) {
    url = filterURL(url)
    return axios.get(url, apiInputHeaders(params))
        .then(response =>  response.data)
        .catch(error => console.log(error))
}

function apiNavSchema(url) {
    url = filterURL(url)
    return axios.get(url, apiInputSchemaHeaders())
        .then(response =>  response.data)
}

function apiPost(url, data) {
    url = filterURL(url)
    return axios.post(url, data, apiInputHeaders())
}

function apiUpdate(url, values) {
    url = filterURL(url)
    return axios.patch(url, values, apiInputHeaders())
}

function apiDelete(url) {
    url = filterURL(url)
    return axios.delete(url, apiInputHeaders())
        .then(resp => resp.status == 204)
}

export {apiNav, apiPost, apiUpdate, getURLFromRel, apiNavMany, apiNavParam, apiDelete, getURLFromEntitySearch, apiNavSchema}