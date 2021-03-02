import { TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export default function AssetRow({ serialNumber, name, type, model, owner, location, link }) {
    return (
        <TableRow>
            <TableCell>
                <Link 
                    to={{
                        pathname: "/app/assets/" + serialNumber,
                        state: { assetURL: link }
                    }}>
                        {serialNumber}
                </Link>
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>{model}</TableCell>
            <TableCell>{owner}</TableCell>
            <TableCell>{location}</TableCell>
            <TableCell>
                <Link to={{
                    pathname: "/app/assets/update/" + serialNumber,
                    state: { assetURL: link}
                }}>Update</Link>
            </TableCell>
        </TableRow>
    )
}