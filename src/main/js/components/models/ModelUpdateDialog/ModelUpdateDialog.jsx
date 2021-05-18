import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { ModelUpdate } from '..'

export default function ModelUpdateDialog({ showDialog, onClose, model, uri, onUpdate }) {

    return (
        <>
            <Dialog
                open={ showDialog }
                onClose={ onClose} >
                
                <DialogTitle>
                    Update Model
                </DialogTitle>

                <DialogContent>
                    <ModelUpdate
                        model={ model }
                        uri={ uri }
                        onUpdate={ onUpdate } />
                </DialogContent>

            </Dialog>
        </>
    )
}