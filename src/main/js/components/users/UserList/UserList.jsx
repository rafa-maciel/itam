import React from 'react'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'


export default function UserList({users, handleSelectUser}) {
    
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