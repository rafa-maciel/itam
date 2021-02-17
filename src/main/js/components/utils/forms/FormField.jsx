import { Grid, MenuItem, TextField } from '@material-ui/core'
import React from 'react'

export default function FormField({id, name, label, onChange, inputProps}) {
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