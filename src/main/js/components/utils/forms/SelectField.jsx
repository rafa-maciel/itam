import React from 'react'
import { MenuItem, TextField } from '@material-ui/core'

export default function SelectField({label, name, defaultValue, onChange, items}) {
    return (
        <TextField
            label={label}
            select={true}
            fullWidth
            name={name} 
            defaultValue={defaultValue ? defaultValue : items[0]}
            onChange={onChange}
            helperText={label}>
                {items.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
        </TextField>
    )
}