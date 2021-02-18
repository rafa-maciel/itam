import React from 'react'
import { FormControlLabel, Switch } from '@material-ui/core'

export default function SwitchField({name, label, onChange}) {
    return (
            <FormControlLabel
                control={<Switch name={name} color="primary" onChange={onChange}/>}
                label={label}
                labelPlacement="start"
            />
    )
}