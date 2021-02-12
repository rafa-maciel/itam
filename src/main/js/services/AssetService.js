import axios from 'axios'
import responsePromise from 'rest/util/responsePromise'

const { getURLFromRel} = require('../api/api')
require('axios')

export default class AssetService {
    list(size) {
        size = size ? size : 20
        return getURLFromRel('assets')
            .then(url => {
                return axios.get(url.href, {params: {size}})
                    .then(response => response.data)
            })
    }

    nav(url) {
        return axios.get(url)
            .then(response => response.data)
    }
}