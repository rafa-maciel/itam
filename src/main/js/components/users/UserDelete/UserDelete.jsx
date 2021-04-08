import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { apiDelete } from '../../../api/api'

export default function UserDelete({ uri, name, department, re, onUserDeleted }) {

    const handleDeleteConfirm = () => {
        apiDelete(uri)
            .then(resp => onUserDeleted(resp))
    }

    return (
        <>
            <Typography variant="h5">
                Are you sure you want to delete the User [{ name }] with RE [{ re }] of [{department}] Department  ?
            </Typography>
            <Button color="secondary" onClick={ handleDeleteConfirm }>Confirm</Button>
        </>
    )
}