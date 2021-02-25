import React, { useContext } from 'react'
import { apiPost } from '../../../api/api'
import { APIUrlsContext, DomainSchemasContext } from '../../../app'
import { SchemaForm } from '../../utils/forms'

export default function ModelCreate({onCreateUser}) {
    const {deviceModels:modelUrl} = useContext(APIUrlsContext)
    const {devicemodel:modelSchema} = useContext(DomainSchemasContext)

    const handleFormSubmit = values => {
        if (modelUrl && values && JSON.stringify(values) != "{}") {
            apiPost(modelUrl.href, values)
                .then(resp => resp.data)
                .then(data => {onCreateUser(data)})
        } 
    }

    return (
        <SchemaForm domainSchema={modelSchema} onSubmit={handleFormSubmit} />
    )
}