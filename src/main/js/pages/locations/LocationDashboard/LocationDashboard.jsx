import { IconButton, Toolbar, Typography } from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react'
import { apiNav } from '../../../api/api'
import { APIUrlsContext } from '../../../app'
import { LocationCreateDialog, LocationTable } from '../../../components/locations'
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function LocationDashboard() {
    const { locations:locationsURL } = useContext(APIUrlsContext)
    const [ apiURL, setApiURL ] = useState(null)
    const [ locations, setLocations ] = useState([])

    const [ showCreateDialog, setShowCreateDialog ] = useState(false)

    useEffect(() => {
        if (locationsURL) setApiURL(locationsURL.href)
    }, [ locationsURL ])

    useEffect(() => {
        if (apiURL) findLocations()
    }, [ apiURL ])

    const findLocations = () => {
        if (apiURL) {
            apiNav(apiURL)
                .then(data => data._embedded.locations)
                .then(locationsData => setLocations(locationsData))
        }
    }

    return (
        <>
            <DashboardBar onCreateCall={() => { setShowCreateDialog(true) }} />
            <LocationTable locations={ locations } onUpdateItemList={() => findLocations()}/>

            <LocationCreateDialog
                showDialog={ showCreateDialog }
                onClose={ () => { setShowCreateDialog(false) }}
                onSuccessCreated={ () => {
                    setShowCreateDialog(false) 
                    findLocations() 
                }}
                />
        </>
    )
}


function DashboardBar({ onCreateCall }) {
    return (
        <Toolbar className="topbar">
            <Typography variant="h6" noWrap>Locations Dashboard</Typography>
            
            <div className="topbar-icons">
                <IconButton aria-label="show 4 create-location" color="inherit" 
                    onClick={ onCreateCall }>
                    <AddCircleIcon/>
                </IconButton>
            </div>
            
        </Toolbar>
    )
}