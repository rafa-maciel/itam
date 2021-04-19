import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { LocationCreate } from '..'

export default function LocationCreateDialog({ showDialog, onClose, onSuccessCreated }) {
    return (
        <>
            <Dialog
                open={ showDialog }
                onClose={ onClose }>
                
                <DialogTitle>
                    Create Location
                </DialogTitle>

                <DialogContent>
                    <LocationCreate onCreateLocation={ onSuccessCreated } />
                </DialogContent>
            </Dialog>
        </>
    )
}