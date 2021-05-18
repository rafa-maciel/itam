import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { apiDelete } from '../../../api/api'

export default function ModelDelete({ uri, model, brand, onDelete }) {
    const handleDeleteConfirm = () => {
        apiDelete(uri)
            .then(resp => onDelete(resp))
    }

    return (
        <>
            <Typography variant="h5">
                Are you sure you want to delete the Model [{ model } - ({ brand })] ?
            </Typography>
            <Button color="secondary" onClick={ handleDeleteConfirm }>Confirm</Button>
        </>
    )
}