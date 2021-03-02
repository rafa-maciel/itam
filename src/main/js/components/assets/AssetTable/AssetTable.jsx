import React from 'react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core'
import './style.css';
import { AssetRow } from '..';

export default function AssetTable({ assets, page, onPageChange, onRowsSizeChange}) {
   
    return (
        <>
            <Table size="small" aria-label="a dense table" className='asset-table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Serial Number</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { assets.map((asset, index) =>  (
                        <AssetRow key={index} 
                            serialNumber={asset.serialNumber}
                            name={asset.name}
                            type={asset.type}
                            model={asset.model.model}
                            owner={asset.owner.name}
                            location={asset.location.title}
                            link={asset._links.self.href} /> 
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination 
                            rowsPerPageOptions={page.rowsPerPageOptions} 
                            count={page.totalElements}
                            rowsPerPage={page.size}
                            page={page.number}
                            onChangePage={(event, number) => {onPageChange(number)}}
                            onChangeRowsPerPage={event => {onRowsSizeChange(event.target.value)}}
                            />
                    </TableRow>
                </TableFooter>
            </Table>
            
        </>
    )
}