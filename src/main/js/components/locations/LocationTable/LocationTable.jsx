import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'
import { LocationDeleteDialog, LocationUpdateDialog }  from '../'

export default function LocationTable({ locations, onUpdateItemList }) {
    const [ selectedLocation, setSelectedLocation ] = useState({})
    const [ showUpdateDialog, setShowUpdateDialog ] = useState(false)
    const [ showDeleteDialog, setShowDeleteDialog ] = useState(false)

    const tableHeaders = ['Title', 'City', 'Address', 'Actions']

    return (
        <>
            <Table size='small' aria-label="Location table" className="location-table">
                <LocationTableHeader headers={ tableHeaders }></LocationTableHeader>

                <TableBody>
                    { locations.map((location, index) => (
                        <LocationTableRow 
                            location={location} 
                            key={index} 
                            onUpdateCall={location => {
                                setSelectedLocation(location)
                                setShowUpdateDialog(true)
                            }}
                            onDeleteCall={location => {
                                setSelectedLocation(location)
                                setShowDeleteDialog(true)
                            }}/>
                            
                    )) }
                </TableBody>

            </Table>

            <LocationUpdateDialog
                showDialog={ showUpdateDialog } 
                location={ selectedLocation }
                onClose={ () => { setShowUpdateDialog(false) }}
                onUpdate={ () => {
                    setShowUpdateDialog(false)
                    onUpdateItemList()
                }}
                uri={selectedLocation && selectedLocation._links ? selectedLocation._links.self.href : null}/>

            <LocationDeleteDialog 
                showDialog={ showDeleteDialog }
                onClose={ () => setShowDeleteDialog(false) }
                onDelete={ () => {
                    setShowDeleteDialog(false)
                    onUpdateItemList()
                }}
                location={ selectedLocation } 
                uri={selectedLocation && selectedLocation._links ? selectedLocation._links.self.href : null}
                />

        </>
    )
}

function LocationTableHeader({ headers }) {
    return (
        <TableHead>
            <TableRow>
                { headers.map((title, index) => <TableCell key={ index }>{title}</TableCell>) }
            </TableRow>
        </TableHead>
    )
}

function LocationTableRow({ location, onUpdateCall, onDeleteCall }) {
    return (
        <TableRow>
            <TableCell>{ location.title }</TableCell>
            <TableCell>{ location.city }</TableCell>
            <TableCell>{ location.address }</TableCell>
            <TableCell>
                 <Button
                    type="button" 
                    onClick={() => onUpdateCall(location)}
                    >Update</Button>
                   |
                <Button 
                    type="button" 
                    onClick={() => onDeleteCall(location)}
                    >Remove</Button>
            </TableCell>
        </TableRow>
    )
}