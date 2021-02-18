import React from 'react'
import { MenuItem, TextField } from '@material-ui/core'

export default function FormField({id, name, label, onChange, inputProps}) {
    return (
        <TextField 
            id={id}
            label={label}
            select={inputProps && inputProps.select ? true : false}
            type={inputProps && inputProps.number ? 'number' : 'text'}
            fullWidth
            name={name} 
            defaultValue={inputProps && inputProps.select && inputProps.selectItems ? inputProps.selectItems[0] : ''}
            onChange={onChange}
            helperText={label}>
                {inputProps && inputProps.select && inputProps.selectItems ? inputProps.selectItems.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                )) : ''}
        </TextField>
    )
}