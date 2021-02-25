import React, { useContext } from 'react'
import { apiPost } from '../../../api/api'
import { APIUrlsContext, DomainSchemasContext } from '../../../app'
import { SchemaForm } from '../../utils/forms'

export default function LocationCreate({ onCreateLocation }) {
    const { locations:locationUrl } = useContext(APIUrlsContext)
    const { location:locationSchema } = useContext(DomainSchemasContext)

    const handleFormSubmit = values => {
        if (locationUrl && values && JSON.stringify(values) != "{}") {
            apiPost(locationUrl.href, values)
                .then(resp => resp.data)
                .then(data => {onCreateLocation(data)})
        }
    }

    return (
        <SchemaForm domainSchema={locationSchema} onSubmit={handleFormSubmit} />
    )
}