import React, { useEffect, useState } from 'react'
import AssetService from '../../../services/AssetService'
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core'
import './style.css';
import { Link } from 'react-router-dom';

function AssetTableRow({serialNumber, name, type, model, owner, location, link}) {
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

export default function AssetTable() {
    const [currentDataUrl, setCurrentDataUrl] = useState(null)
    const [assets, setAssets] = useState([])
    const [page, setPage] = useState({size:10, totalElements:0, totalPages:0, number:0})
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const service = new AssetService()

    useEffect(() => {
        let apiAction = currentDataUrl ? service.nav(currentDataUrl) : service.list(rowsPerPage)
        apiAction.then(data => {
            setPage({
                size: data.page.size,
                totalElements: data.page.totalElements,
                totalPages: data.page.totalPages,
                number: data.page.number,
                nextUrl: data._links.next ? data._links.next.href : null,
                previousUrl: data._links.prev ? data._links.prev.href : null
            })
            return data._embedded.assets
        })
        .then(assetList => {
            let assetRows = assetList.map((asset, index) => 
                <AssetTableRow key={index} 
                    serialNumber={asset.serialNumber}
                    name={asset.name}
                    type={asset.type}
                    model={asset.model.model}
                    owner={asset.owner.name}
                    location={asset.location.title}
                    link={asset._links.self.href} />
                )

            setAssets(assetRows)
        })
    }, [currentDataUrl, rowsPerPage])

    function onChangePage(event, pageNumber) {
        let navUrl = pageNumber >= page.number ? page.nextUrl : page.previousUrl
        setCurrentDataUrl(navUrl)
    }

    function onChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value)
        if (currentDataUrl) setCurrentDataUrl(null)
    }

    return (
        <>
            <Link to="/app/assets/add">Create</Link>
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
                    {assets}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination 
                            rowsPerPageOptions={[5, 10, 20]} 
                            count={page.totalElements}
                            rowsPerPage={rowsPerPage}
                            page={page.number}
                            onChangePage={onChangePage}
                            onChangeRowsPerPage={onChangeRowsPerPage}
                            />
                    </TableRow>
                </TableFooter>
            </Table>
            
        </>
    )
}