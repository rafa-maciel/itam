import React from 'react'
import { TextField } from '@material-ui/core'

export default function NumberField({label, number, onChange, name, defaultValue}) {

    return (
        <TextField
            label={label}
            type='number'
            fullWidth
            onChange={onChange}
            helperText={label}
            name={name}
            defaultValue={defaultValue}>
        </TextField>
    )
}