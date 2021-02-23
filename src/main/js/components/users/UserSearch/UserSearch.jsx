import React, { useState, useEffect, useContext } from 'react'
import { APIUrlsContext } from '../../../app'
import { apiNav, apiNavParam } from '../../../api/api'

import { IconButton, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {UserList} from '..'


export default function UserSearch({handleSelectUser}) {
    const [users, setUsers] = useState([])
    const {users:usersURL} = useContext(APIUrlsContext)
    const [searchUserUrl, setSearchUserUrl] = useState(null)
    const [searchUserParam, setSearchUserParam] = useState('')

    useEffect(() => {
        if (usersURL) {
            apiNav(usersURL.href + "/search")
                .then(data => data._links.nameContains.href)
                .then(searchLink => {
                    setSearchUserUrl(searchLink)
                })
        }
    }, [usersURL])


    const findUsers = () => {
        if (searchUserUrl) {
            apiNavParam(searchUserUrl, {name:searchUserParam})
                .then(data => data._embedded.users)
                .then(userList => setUsers(userList))
        }
    }

    return (
        <>
            <TextField 
                label="Find User by Name"
                type='text'
                value={searchUserParam}
                fullWidth 
                onChange={e => setSearchUserParam(e.target.value)}
                helperText="Find User by Name"
                InputProps={{
                    endAdornment: 
                        <>
                            <IconButton aria-label="search" type="button" onClick={findUsers}>
                                <SearchIcon />
                            </IconButton>
                        </>
                    }}>
            </TextField>
           <UserList users={users} handleSelectUser={handleSelectUser} />
        </>
    )
}