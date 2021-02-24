import React from 'react'
import { IconButton, TextField } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import { DialogControl } from '../../utils/controls';
import { useState } from 'react';
import { UserSearch, UserCreate } from '..';

export default function UserFindDialog({name, label, handleValueChange}) {
    const [dialogFinderUserOpened, setDialogFinderUserOpened] = useState(false)
    const [dialogCreateUserOpened, setDialogCreateUserOpened] = useState(false)
    const [user, setUser] = useState({name: '', re: ''})

    const handleSelectUser = userSelected => {
        setDialogFinderUserOpened(false)
        setDialogCreateUserOpened(false)
        setUser(userSelected)
        handleValueChange(name, userSelected._links.self.href)
    }
    
    return (
        <>
            <TextField 
                label={label}
                type='text'
                value={user.name}
                fullWidth
                name={name} 
                // defaultValue={defaultValue ? defaultValue : ''}
                onChange={handleValueChange}
                helperText={label}
                InputProps={{
                    readOnly: true,
                    endAdornment: 
                        <>
                            <IconButton aria-label="search" type="button" onClick={() => {setDialogFinderUserOpened(true)}}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton aria-label="create" type="button" onClick={() => {setDialogCreateUserOpened(true)}}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </>
                    }}>
            </TextField>
            <DialogControl title='Find User' dialogOpen={dialogFinderUserOpened} onCloseAction={() => {setDialogFinderUserOpened(false)}}>
                <UserSearch handleSelectUser={handleSelectUser}></UserSearch>
            </DialogControl>
            <DialogControl title='Create User' dialogOpen={dialogCreateUserOpened} onCloseAction={() => {setDialogCreateUserOpened(false)}}>
                <UserCreate onCreateUser={handleSelectUser} />
            </DialogControl>
        </>
    )
}