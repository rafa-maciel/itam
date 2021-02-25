import React, { useContext } from 'react'
import { apiPost } from '../../../api/api'
import { APIUrlsContext, DomainSchemasContext } from '../../../app'
import { SchemaForm } from '../../utils/forms'

export default function UserCreate({onCreateUser}) {
    const {users:usersUrl} = useContext(APIUrlsContext)
    const {user:userSchema} = useContext(DomainSchemasContext)

    const handleFormSubmit = values => {
        if (usersUrl) {
            apiPost(usersUrl.href, values)
                .then(resp => resp.data)
                .then(data => {
                    onCreateUser(data)
                })
        }
    } 

    return (
        <SchemaForm domainSchema={userSchema} onSubmit={handleFormSubmit} />
    )
}