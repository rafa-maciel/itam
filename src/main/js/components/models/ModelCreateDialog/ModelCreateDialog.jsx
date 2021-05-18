import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { ModelCreate } from '..'

export default function ModelCreateDialog({ showDialog, onClose, onSuccessCreated }) {
    return (
        <> 
            <Dialog
                open={ showDialog }
                onClose={ onClose }>
                
                <DialogTitle>
                    Create Model
                </DialogTitle>

                <DialogContent>
                    <ModelCreate onCreateUser={ onSuccessCreated } />
                </DialogContent>

            </Dialog>
        </>
    )
}