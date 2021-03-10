import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { apiNav, apiUpdate } from '../../../api/api';
import { AssetForm } from '../../../components/assets';

export default function AssetUpdate() {
    const history = useHistory()
    const { state: {assetURL}} = useLocation();

    const [assetData, setAssetData] = useState({})

    useEffect(() => {
        if (assetURL) {
            apiNav(assetURL)
                .then(asset => {
                    setAssetData(asset)
                })
        }
    }, [assetURL])

    const handleFormSubmit = (e, values) => {
        e.preventDefault()
        if (values && assetURL) {
            apiUpdate(assetURL, values)   
                .then(response => {
                    if (response.status == 200) {
                        history.push('/app')
                    } else {
                        alert('There is an error on update asset attempt')
                        console.log(response.statusText)
                    }
                })
        }
    }
    
    return(
        <>
            <AssetForm formLabel="Update Asset" submitButtonLabel="Update Asset" onFormSubmit={handleFormSubmit} initialData={assetData}/>
        </>
    )
}