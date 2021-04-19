import React, { useContext } from 'react'
import { apiUpdate } from '../../../api/api'
import { DomainSchemasContext } from '../../../app'
import { SchemaForm } from '../../utils/forms'

export default function LocationUpdate({ uri, onUpdate, location }) {
    const { location:locationSchema } = useContext(DomainSchemasContext)

    const handleFormSubmit = values => {
        apiUpdate(uri, values)
            .then(response => {
                if( response.status === 200 ) onUpdate()
            })
    }

    return (
        <>
            <SchemaForm domainSchema={ locationSchema } initialData={ location } onSubmit={ handleFormSubmit } />
        </>
    )
}