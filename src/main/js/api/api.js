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