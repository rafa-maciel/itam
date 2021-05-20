import { AppBar, Badge, Button, Dialog, DialogContent, DialogTitle, IconButton, InputBase, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { UserCreate, UserDelete, UserUpdate } from '../'
import AddCircleIcon from '@material-ui/icons/AddCircle';

import './style.css'
import { Link } from 'react-router-dom';

export default function UserTable({ users, onItemsChange }) {
    const [selectedUser, setSelectedUser] = useState({})
    const [updatDialogOpen, setUpdatDialogOpen] = useState(false)
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const tableHeadersTitles = ['RE', 'Name', 'Job Role', 'Department', 'Actions']

    const handleUpdateDialog = user => {
        setSelectedUser(user)
        setUpdatDialogOpen(true)
    }

    const handleUserUpdated = () => {
        setUpdatDialogOpen(false)
        onItemsChange()
    }

    const handleUserCreated = () => {
        setCreateDialogOpen(false)
        onItemsChange()
    }

    const handleDeleteDialog = user => {
        setSelectedUser(user)
        setDeleteDialogOpen(true)
    }

    const handleUserDeleted = (resp) => {
        setDeleteDialogOpen(false)
        onItemsChange()
    }

    return (
        <>
            <Table size='small' aria-label="User table" className="user-table">
                <UserTableHeader
                    headers={ tableHeadersTitles } 
                    onCreateCall={ () => { setCreateDialogOpen(true) }}/>

                <TableBody>
                    { users.map( (user, index) => (
                        <UserTableRow
                            key={ index }
                            user={ user }
                            onUpdateCall={ () => handleUpdateDialog(user) } 
                            onDeleteCall={ () => handleDeleteDialog(user) }/>
                    ))}
                </TableBody>
            </Table>

            <UpdateUserDialog 
                showDialog={ updatDialogOpen }
                user={ selectedUser }
                uri={ selectedUser && selectedUser._links ? selectedUser._links.self.href : null }
                onUpdate={ handleUserUpdated } 
                onClose={() => { setUpdatDialogOpen(false) }}/>

            <CreateUserDialog
                showDialog={ createDialogOpen }
                onCreate={ handleUserCreated } 
                onClose={() => { setCreateDialogOpen(false) }}/>

            <DeleteUserDialog 
                showDialog={ deleteDialogOpen }
                user={ selectedUser }
                uri={ selectedUser && selectedUser._links ? selectedUser._links.self.href : null }
                onDelete={ handleUserDeleted } 
                onClose={() => { setDeleteDialogOpen(false) }}/>

        </>
    )
}

function UpdateUserDialog({ showDialog, user, uri, onUpdate, onClose }) {
    return (
        <Dialog
            open={ showDialog }
            onClose={ onClose }>
            
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

function CreateUserDialog({ showDialog, onCreate, onClose }) {
    return (
        <Dialog
            open={ showDialog }
            onClose={ onClose }>
            
            <DialogTitle>
                Create User
            </DialogTitle>

            <DialogContent>
                <UserCreate onCreateUser={onCreate} />
            </DialogContent>
        </Dialog>
    )
}

function DeleteUserDialog({ showDialog, user, uri, onDelete, onClose }) {
    return (
        <Dialog
            open={ showDialog }
            onClose={ onClose }>
            
            <DialogTitle>
                Delete User
            </DialogTitle>

            <DialogContent>
                <UserDelete 
                    name={ user.name }
                    department={ user.department }
                    re={ user.re }
                    uri={ uri }
                    onUserDeleted={ onDelete } />
            </DialogContent>
        </Dialog>
    )
}

function UserTableRow({ user, onUpdateCall, onDeleteCall}) {
    const detailsParam = {
        pathname: "/app/users/" + user.re,
        state: { userURI: user._links.self }
    }

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
                |
                <Button 
                    type="button" 
                    onClick={() => onDeleteCall(user)}
                    >Remove</Button>
                |
                <Link to={{
                    pathname: "/app/users/" + user.re,
                    state: { userURI: user._links.self.href}
                }}> See Details </Link>
            </TableCell>
        </TableRow>
    )
}

function UserTableHeader({ headers, onCreateCall }) {
    return (
        <TableHead>
            <TableRow>
                <TableCell colSpan={headers.length}><TableTopBar onCreateCall={ onCreateCall }></TableTopBar></TableCell>
            </TableRow>
            <TableRow>
                { headers.map((title, index) => <TableCell key={ index }>{title}</TableCell>) }
            </TableRow>
        </TableHead>
    )
}

function TableTopBar({ onCreateCall }) {
    return (
        <Toolbar className="topbar">
            <Typography variant="h6" noWrap>Users Dashboard</Typography>
            
            <div className="topbar-icons">
                <IconButton aria-label="show 4 create-user" color="inherit" onClick={ onCreateCall }>
                    <AddCircleIcon/>
                </IconButton>
            </div>
            
        </Toolbar>
    )
}