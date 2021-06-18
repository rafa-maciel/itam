import React from 'react'
import { apiPost } from '../../api/api'
import { AuthenticationForm } from '../../components/utils/forms'

export default function Authentication( {onSuccessfulyAuthenticated} ) {
    const authURL = "http://localhost:8080/auth"

    const handleFormSubmit = (data) => {
        console.log(data)
        apiPost(authURL, data)
            .then(resp => {
                localStorage.setItem('ITAM_TOKEN_AUTH', resp.data.token)
                onSuccessfulyAuthenticated()
            })
            .catch(error => {console.log(error)})
    }

    return (
        <>
            <AuthenticationForm onFormSubmit={handleFormSubmit} />
        </>
    )
}