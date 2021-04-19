import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { LocationUpdate } from '..'

export default function LocationUpdateDialog({ showDialog, onClose, location, uri, onUpdate }) {
    return (
        <>
            <Dialog
                open={ showDialog }
                onClose={ onClose }>
                
                <DialogTitle>
                    Update Location
                </DialogTitle>

                <DialogContent>
                    <LocationUpdate 
                        location={ location } 
                        uri={ uri }
                        onUpdate={ onUpdate }/>
                </DialogContent>
            </Dialog>
        </>
    )
}