import { IconButton, TextField } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { apiNav, apiNavParam } from '../../../api/api'
import SearchIcon from '@material-ui/icons/Search';
import { LocationList } from '..';
import { APIUrlsContext } from '../../../app';

export default function LocationSearch({ onLocationChange }) {
    const { locations:locationsUrl } = useContext(APIUrlsContext)
    const [ searchUrl, setSearchUrl ] = useState(null)
    const [ searchParamenter, setSearchParameter ] = useState('')
    const [locations, setLocations] = useState([])

    useEffect(() => {
        if (locationsUrl) {
            apiNav(locationsUrl.href + "/search")
                .then(data => data._links.locationContains.href)
                .then(url => {setSearchUrl(url)})
        }
    }, [locationsUrl])

    const findLocations = () => {
        if (searchUrl) {
            let params = { 
                title: searchParamenter, 
                city: searchParamenter
            }

            apiNavParam(searchUrl, params)
                .then(data => data._embedded.locations)
                .then(locationList => {setLocations(locationList)})
        }
    }

    return (
        <>
            <TextField 
                label="Find Locations"
                type='text'
                value={searchParamenter}
                fullWidth 
                onChange={e => setSearchParameter(e.target.value)}
                helperText="Find by Location title or City"
                InputProps={{
                    endAdornment: 
                        <>
                            <IconButton aria-label="search" type="button" onClick={findLocations}>
                                <SearchIcon />
                            </IconButton>
                        </>
                    }}>
            </TextField>
            
            <LocationList locations={locations} onLocationSelect={onLocationChange} />
        </>
    )


     
} 