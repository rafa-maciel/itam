import { IconButton, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { apiNav, apiNavParam } from '../../../api/api'
import { APIUrlsContext } from '../../../app'
import SearchIcon from '@material-ui/icons/Search';
import { ModelList } from '..';

export default function ModelSearch({onModelChange}) {
    const {deviceModels:modelsUrl} = useContext(APIUrlsContext)
    const [searchUrl, setSearchUrl] = useState(null)
    const [searchParameter, setSearchParameter] = useState('')
    const [models, setModels] = useState([])

    useEffect(() => {
        if (modelsUrl) {
            apiNav(modelsUrl.href + "/search")
                .then(data => data._links.modelContains.href)
                .then(url => {setSearchUrl(url)})
        }
    }, [modelsUrl])

    const findModels = () => {
        if (searchUrl) {
            apiNavParam(searchUrl, {model: searchParameter})
                .then(data => data._embedded.deviceModels)
                .then(modelList => {setModels(modelList)})
        }
    }

    return (
        <>
            <TextField 
                label="Find Models"
                type='text'
                value={searchParameter}
                fullWidth 
                onChange={e => setSearchParameter(e.target.value)}
                helperText="Find by Model"
                InputProps={{
                    endAdornment: 
                        <>
                            <IconButton aria-label="search" type="button" onClick={findModels}>
                                <SearchIcon />
                            </IconButton>
                        </>
                    }}>
            </TextField>

            <ModelList models={models} onModelSelect={onModelChange} />
        </>
    )
}