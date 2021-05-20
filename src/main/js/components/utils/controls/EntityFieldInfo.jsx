import { Grid } from '@material-ui/core'
import React from 'react'

export default function EntityFieldInfo({ name, value }) {
    const formatTitle = (title) => {
        return title ? title.replace(/([A-Z])/g, ' $1').trim() : null
    }

    return (
        <Grid item xs={12} md={6}>
            <Grid container>
                <Grid item xs={4}><strong>{ formatTitle(name) }</strong></Grid>
                <Grid item xs={8}>{typeof( value ) == "boolean" ? (value ? "Yes" : "No") : value}</Grid>
            </Grid>
        </Grid>
    )
}