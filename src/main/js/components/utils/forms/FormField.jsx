import React from 'react'
import { TextField } from '@material-ui/core'

export default function FormField({name, label, defaultValue, onChange}) {
    return (
        <TextField 
            label={label}
            type='text'
            fullWidth
            name={name} 
            defaultValue={defaultValue ? defaultValue : ''}
            onChange={onChange}
            helperText={label}>
        </TextField>
    )
}