import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import React, { Children } from 'react'

export default function DialogControl({dialogOpen, onCloseAction, title, children}) {

    return (
        <>
            <Dialog open={dialogOpen} onClose={onCloseAction} aria-labelledby="form-dialog-title">
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseAction} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}