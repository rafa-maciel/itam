import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { apiNav, apiNavMany, apiUpdate } from '../../../api/api';
import { AssetForm } from '../';

export default function AssetUpdate() {
    const history = useHistory()
    const { state: {assetURL}} = useLocation();

    const [assetData, setAssetData] = useState({})

    useEffect(() => {
        if (assetURL) {
            apiNav(assetURL)
                .then(asset => {
                    let relurls = Object.keys(asset._links)
                        .filter(key => key != 'self' && key != 'asset')
                        .map(key => asset._links[key].href)

                    apiNavMany(relurls)
                    .then(responses => {
                        responses.forEach(res => {
                            switch (res.config.url) {
                                case asset._links.owner.href:
                                    asset.owner = res.data
                                    break;

                                case asset._links.location.href:
                                    asset.location = res.data
                                    break;

                                case asset._links.model.href:
                                    asset.model = res.data
                                    break;
                            
                                default:
                                    break;
                            }
                        })
                    })

                    setAssetData(asset)
                })
        }
    }, [assetURL])

    const handleFormSubmit = (e, values) => {
        e.preventDefault()
        if (values) {
            apiUpdate(assetURL, values)   
                .then(response => {
                    if (response.status == 200) {
                        console.log('asset updated')
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