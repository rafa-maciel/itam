import React, { useContext } from 'react'
import { apiUpdate } from '../../../api/api'
import { DomainSchemasContext } from '../../../app'
import { SchemaForm } from '../../utils/forms'

export default function UserUpdate({ uri, onUpdate, user }) {
    const {user:userSchema} = useContext(DomainSchemasContext)

    const handleFormSubmit = values => {
        apiUpdate(uri, values)
            .then(response => {
                if( response.status === 200 ) onUpdate()
            })
    }

    return (
        <SchemaForm domainSchema={ userSchema } initialData={ user } onSubmit={ handleFormSubmit } />
    )

}