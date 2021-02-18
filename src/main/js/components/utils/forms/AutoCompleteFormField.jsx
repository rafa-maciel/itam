import React from 'react'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

export default function AutoCompleteFormField({id, label, onChange, options}) {
    return (
        <>
            <Autocomplete
                id={id}
                options={options}
                getOptionLabel={(option) => option.label}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} label={label} />}
                />
        </>
    )
}