import { FormControlLabel, Grid, Switch } from '@material-ui/core'
import React from 'react'

export default function SwitchField({name, label, onChange}) {
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