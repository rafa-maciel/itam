import { Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import { UserUpdate } from '../'

export default function UserTable({ users, onItemsChange }) {
    const [selectedUser, setSelectedUser] = useState({})
    const [updatDialogOpen, setUpdatDialogOpen] = useState(false)

    const handleUpdateDialog = user => {
        setSelectedUser(user)
        setUpdatDialogOpen(true)
    }

    const handleUserUpdated = () => {
        setUpdatDialogOpen(false)
        onItemsChange()
    }

    return (
        <>
            <Table size='small' aria-label="User table" className="user-table">
                <TableHead>
                    <TableRow>
                        <TableCell>RE</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Job Role</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    { users.map( (user, index) => (
                        <TableRow key={ index }>
                            <TableCell>{ user.re }</TableCell>
                            <TableCell>{ user.name }</TableCell>
                            <TableCell>{ user.jobRole }</TableCell>
                            <TableCell>{ user.department }</TableCell>
                            <TableCell>
                                <Button 
                                    type="button" 
                                    onClick={() => handleUpdateDialog(user)}
                                    >Update</Button>
                                 | Remove
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog
                open={ updatDialogOpen }>
                
                <DialogTitle>
                    Update User
                </DialogTitle>

                <DialogContent>
                    <UserUpdate 
                        user={ selectedUser } 
                        uri={ selectedUser && selectedUser._links ? selectedUser._links.self.href : null }
                        onUpdate={ handleUserUpdated }/>
                </DialogContent>
            </Dialog>
        </>
    )
}