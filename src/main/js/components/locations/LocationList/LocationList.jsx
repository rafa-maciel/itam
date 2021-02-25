import React from 'react'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

export default function LocationList({ locations, onLocationSelect }) {

    return (
        <>
            <Table size="small" aria-label="Locations Table" className="location-table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { locations.map((location, index) => (
                        <TableRow key={index}>
                            <TableCell>{location.title}</TableCell>
                            <TableCell>{location.city}</TableCell>
                            <TableCell>{location.address}</TableCell>
                            <TableCell><Button type="button" onClick={() => {onLocationSelect(location)}}>Select</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}