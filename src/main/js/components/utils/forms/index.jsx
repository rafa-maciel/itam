import React from 'react'
import { FormControlLabel, Grid, MenuItem, Switch, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

export function FormField({id, name, label, onChange, inputProps}) {
    return (
        <Grid item xs={12} md={6}>
            <TextField 
                id={id}
                label={label}
                select={inputProps && inputProps.select ? true : false}
                type={inputProps && inputProps.number ? 'number' : 'text'}
                fullWidth
                name={name} 
                onChange={onChange}
                helperText={label}>
                    {inputProps && inputProps.select && inputProps.selectItems ? inputProps.selectItems.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    )) : ''}
            </TextField>
        </Grid>
    )
}

export function SwitchField({name, label, onChange}) {
    return (
        <Grid item xs={12} md={6}>
            <FormControlLabel
                control={<Switch name={name} color="primary" onChange={onChange}/>}
                label={label}
                labelPlacement="start"
            />
        </Grid>
    )
}

export function AutoCompleteFormField({id, label, onChange, options}) {
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

