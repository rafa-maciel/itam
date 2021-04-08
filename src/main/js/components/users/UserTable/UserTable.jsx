import { Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import { UserUpdate } from '../'

export default function UserTable({ users, onItemsChange }) {
    const [selectedUser, setSelectedUser] = useState({})
    const [updatDialogOpen, setUpdatDialogOpen] = useState(false)
    const tableHeadersTitles = ['RE', 'Name', 'Job Role', 'Department', 'Actions']

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
                <UserTableHeader
                    headers={ tableHeadersTitles } />

                <TableBody>
                    { users.map( (user, index) => (
                        <UserTableRow
                            key={ index }
                            user={ user }
                            onUpdateCall={ () => handleUpdateDialog(user) } />
                    ))}
                </TableBody>
            </Table>

            <UpdateUserDialog 
                showDialog={ updatDialogOpen }
                user={ selectedUser }
                uri={ selectedUser && selectedUser._links ? selectedUser._links.self.href : null }
                onUpdate={ handleUserUpdated } />
        </>
    )
}

function UpdateUserDialog({ showDialog, user, uri, onUpdate }) {
    return (
        <Dialog
            open={ showDialog }>
            
            <DialogTitle>
                Update User
            </DialogTitle>

            <DialogContent>
                <UserUpdate 
                    user={ user } 
                    uri={ uri }
                    onUpdate={ onUpdate }/>
            </DialogContent>
        </Dialog>
    )
}

function UserTableRow({ user, onUpdateCall }) {
    return (
        <TableRow>
            <TableCell>{ user.re }</TableCell>
            <TableCell>{ user.name }</TableCell>
            <TableCell>{ user.jobRole }</TableCell>
            <TableCell>{ user.department }</TableCell>
            <TableCell>
                <Button 
                    type="button" 
                    onClick={() => onUpdateCall(user)}
                    >Update</Button>
                    | Remove
            </TableCell>
        </TableRow>
    )
}

function UserTableHeader({ headers }) {
    return (
        <TableHead>
            <TableRow>
                { headers.map((title, index) => <TableCell key={ index }>{title}</TableCell>) }
            </TableRow>
        </TableHead>
    )
}