import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { apiDelete } from '../../../api/api'

export default function AssetDelete({dialogOpened, onCloseDialog, name, model, owner, uri}) {
    
    const handleDelete = () => {
        apiDelete(uri)
            .then(resp =>  {onCloseDialog(resp)})
    }

    return (
        <>
            <Dialog 
                open={dialogOpened}>
                
                <DialogTitle>
                    Delete Asset [{name}]
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the Asset [{name} - {model}] from owner {owner}?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                <Button autoFocus onClick={() => {onCloseDialog(false)}} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="secondary">
                    Delete
                </Button>
                </DialogActions>

            </Dialog>

        </>
    )
}