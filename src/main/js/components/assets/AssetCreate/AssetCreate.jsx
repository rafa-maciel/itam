import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { apiPost } from '../../../api/api.js';
import { APIUrlsContext } from '../../../app.js';
import { AssetForm } from '../';

export default function AssetCreate() {
    const {assets:assetURL} = useContext(APIUrlsContext)
    const history = useHistory()

    const handleFormSubmit = (e, values) => {
        e.preventDefault();
        apiPost(assetURL.href, values)
            .then(response => {
                if (response.status == 201) {
                    history.push("/app")
                } else {
                    alert('There is an error on creating asset')
                    console.log(response.message)
                }
            })
    }

    return (
        <AssetForm onFormSubmit={handleFormSubmit} formLabel="Create New Asset" submitButtonLabel="Create Asset" />
    )
}