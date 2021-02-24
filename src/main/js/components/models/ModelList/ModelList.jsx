import React from 'react'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

export default function ModelList({models, onModelSelect}) {

    return (
        <>
            <Table size="small" aria-label="a dense table" className='model-table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Model</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {models.map((model, index) => 
                        <TableRow key={index}>
                            <TableCell>{model.model}</TableCell>
                            <TableCell>{model.brand}</TableCell>
                            <TableCell><Button type="button" onClick={() => {onModelSelect(model)}}>Select</Button></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}