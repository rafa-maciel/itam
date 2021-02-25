import { IconButton, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { apiNav } from '../../../api/api'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import { DialogControl } from '../../utils/controls';
import { LocationCreate, LocationSearch } from '..';

export default function LocationSelectionDialog({name, label, defaultLocationUri, onChange}) {
    const [searchDialogShow, setSearchDialogShow] = useState(false)
    const [createDialogShow, setCreateDialogShow] = useState(false)
    const [location, setLocation] = useState({ title: '' })

    useEffect(() => {
        if (defaultLocationUri) {
            apiNav(defaultLocationUri)
                .then(data => {
                    handleChangeLocation(data)
                })
        }
    }, [defaultLocationUri])


    const handleChangeLocation = location => {
        if (searchDialogShow) setSearchDialogShow(false)
        if (createDialogShow) setCreateDialogShow(false)

        setLocation(location)
        onChange(name, location._links.self.href)
    }

    return (
        <>
            <TextField 
                label={label}
                type='text'
                value={location.title}
                fullWidth
                name={name} 
                onChange={handleChangeLocation}
                helperText={label}
                InputProps={{
                    readOnly: true,
                    endAdornment: 
                        <>
                            <IconButton aria-label="search" type="button" onClick={() => {setSearchDialogShow(true)}}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton aria-label="create" type="button" onClick={() => {setCreateDialogShow(true)}}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </>
                    }}>
            </TextField>

            <DialogControl 
                dialogOpen={searchDialogShow}
                onCloseAction={() => {setSearchDialogShow(false)}}
                title="Find Locations">
                    <LocationSearch onLocationChange={handleChangeLocation} />
            </DialogControl>
            <DialogControl 
                dialogOpen={createDialogShow}
                onCloseAction={() => {setCreateDialogShow(false)}}
                title="Create Location">
                    <LocationCreate onCreateLocation={handleChangeLocation} />
            </DialogControl>
        </>
    )
} 