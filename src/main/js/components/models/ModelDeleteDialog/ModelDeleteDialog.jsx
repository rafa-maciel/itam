import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { ModelDelete } from '..'

export default function ModelDeleteDialog({ showDialog, onClose, model, brand, uri, onDelete})  {
    return (
        <>
            <Dialog
                open={ showDialog }
                onClose={ onClose }>
                    <DialogTitle>
                        Delete Model
                    </DialogTitle>

                    <DialogContent>
                        <ModelDelete
                            model={ model }
                            brand={ brand }
                            uri={ uri }
                            onDelete={ onDelete} />
                    </DialogContent>
                </Dialog>
        </>
    )
}