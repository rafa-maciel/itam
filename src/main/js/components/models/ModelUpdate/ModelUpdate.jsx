import React from 'react'
import { useContext } from 'react'
import { apiUpdate } from '../../../api/api'
import { DomainSchemasContext } from '../../../app'
import { SchemaForm } from '../../utils/forms'

export default function ModelUpdate({ uri, onUpdate, model }) {
    const { devicemodel: modelSchema } = useContext(DomainSchemasContext)

    const handleFormSubmit = values => {
        apiUpdate(uri, values)
            .then(response => {
                if( response.status === 200 ) onUpdate()
            })
    }

    return (
        <>
            <SchemaForm 
                domainSchema={ modelSchema } 
                initialData={ model }
                onSubmit={ handleFormSubmit } />
                
        </>
    )
}