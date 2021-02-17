import { Grid, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'

export default function AutoCompleteFormField({id, label, onChange, options}) {
    return (
        <>
            <Grid item xs={12} md={6}>
                <Autocomplete
                    id={id}
                    options={options}
                    getOptionLabel={(option) => option.label}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} label={label} />}
                    />
            </Grid>
        </>
    )
}