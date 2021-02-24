import React, { useContext } from 'react'
import { UserForm } from '..'
import { apiPost } from '../../../api/api'
import { APIUrlsContext } from '../../../app'

export default function UserCreate({onCreateUser}) {
    const {users:usersUrl} = useContext(APIUrlsContext)

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
        <UserForm onSubmit={handleFormSubmit} />
    )
}