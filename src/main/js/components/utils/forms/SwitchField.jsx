import React from 'react'
import { FormControlLabel, Switch } from '@material-ui/core'

export default function SwitchField({name, label, onChange, defaultValue}) {
    return (
            <FormControlLabel
                control={
                    <Switch 
                        name={name} 
                        color="primary" 
                        onChange={e => {onChange(e.target.name, e.target.checked)}} 
                        defaultChecked={defaultValue ? defaultValue : false}/>}
                        label={label}
                        labelPlacement="start"
            />
    )
}