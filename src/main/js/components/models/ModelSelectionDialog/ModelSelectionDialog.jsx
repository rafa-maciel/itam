import { IconButton, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { apiNav } from '../../../api/api'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import { DialogControl } from '../../utils/controls';
import { ModelSearch } from '..';

export default function ModelSelectionDialog({name, label, onChange, defaultModelUri}) {
    const [searchDialogShow, setSearchDialogShow] = useState(false)
    const [createDialogShow, setCreateDialogShow] = useState(false)
    const [model, setModel] = useState({ model: '', brand: ''})

    useEffect(() => {
        if (defaultModelUri) {
            apiNav(defaultModelUri)
                .then(data => {
                    handleChangeModel(data)
                })
        }
    }, [defaultModelUri])

    const handleChangeModel = deviceModel => {
        if (searchDialogShow) setSearchDialogShow(false)
        if (createDialogShow) setCreateDialogShow(false)

        setModel(deviceModel)
        onChange(name, deviceModel)        
    }

    return (
        <>
            <TextField 
                label={label}
                type='text'
                value={model.model}
                fullWidth
                name={name} 
                onChange={handleChangeModel}
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
                title="Find Device Models">
                    <ModelSearch onModelChange={handleChangeModel} />
            </DialogControl>
        </>
    )
}