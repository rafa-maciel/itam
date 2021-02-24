import React from 'react'
import { TextField } from '@material-ui/core'

export default function NumberField({label, onChange, name, defaultValue}) {

    return (
        <TextField
            label={label}
            type='number'
            fullWidth
            onChange={e => {onChange(e.target.name, e.target.value)}}
            helperText={label}
            name={name}
            defaultValue={defaultValue}>
        </TextField>
    )
}