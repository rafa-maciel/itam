import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { LocationDelete } from '..'

export default function LocationDeleteDialog({ showDialog, onClose, location, uri, onDelete}) {
    return (
        <>
            <Dialog
                open={ showDialog }
                onClose={ onClose }>
                
                <DialogTitle>
                    Delete Location
                </DialogTitle>

                <DialogContent>
                    <LocationDelete 
                        city={ location.city }
                        title={ location.title }
                        onDelete={ onDelete }
                        uri={ uri } />
                </DialogContent>
            </Dialog>
        </>
    )
}