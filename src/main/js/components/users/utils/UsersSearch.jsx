import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { apiNav } from '../../../api/api'
import { APIUrlsContext } from '../../../app'

export default function UsersSearch({handleSelectUser}) {
    const [users, setUsers] = useState([])
    const {users:usersURL} = useContext(APIUrlsContext)

    useEffect(() => {
        if (usersURL) {
            apiNav(usersURL.href)
                .then(data => data._embedded.users)
                .then(userList => setUsers(userList))
        }
    }, [])



    return (
        <>
            <Table size="small" aria-label="a dense table" className='user-table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Re</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => 
                        <TableRow key={index}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.re}</TableCell>
                            <TableCell>{user.department}</TableCell>
                            <TableCell><Button type="button" onClick={() => {handleSelectUser(user)}}>Select</Button></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}