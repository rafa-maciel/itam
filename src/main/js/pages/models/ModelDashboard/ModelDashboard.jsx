import { IconButton, Toolbar, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { apiNav } from '../../../api/api'
import { APIUrlsContext } from '../../../app'
import { ModelCreateDialog, ModelTable } from '../../../components/models'
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function ModelDashboard() {
    const { deviceModels:modelsURL } = useContext(APIUrlsContext)
    const [ apiURL, setApiURL ] = useState(null)
    const [ models, setModels ] = useState([])

    const [ showCreateDialog, setShowCreateDialog] = useState(false)

    useEffect(() => {
        if ( modelsURL ) setApiURL(modelsURL.href)
    }, [ modelsURL ])

    useEffect(() => {
        if (apiURL) findModels()
    }, [ apiURL ])

    const findModels = () => {
        if (apiURL) {
            apiNav(apiURL)
                .then(data => data._embedded.deviceModels )
                .then(modelsData => {
                    setModels(modelsData)
                })
        }
    }


    return (
        <>
            <DashboardBar onCreateCall={ () => { setShowCreateDialog(true) }} />
            <ModelTable 
                models={ models }
                onUpdateItemList={ () => findModels()} />

            <ModelCreateDialog
                showDialog={ showCreateDialog }
                onSuccessCreated={ () => {
                    setShowCreateDialog(false)
                    findModels()
                }}
                onClose={ () => {
                    setShowCreateDialog(false)
                    findModels()
                }} />
        </>
    )
}

function DashboardBar({ onCreateCall }) {
    return (
        <Toolbar className="topbar">
            <Typography variant="h6" noWrap>Models Dashboard</Typography>
            
            <div className="topbar-icons">
                <IconButton aria-label="show 4 create-model" color="inherit" 
                    onClick={ onCreateCall }>
                    <AddCircleIcon/>
                </IconButton>
            </div>
            
        </Toolbar>
    )
}