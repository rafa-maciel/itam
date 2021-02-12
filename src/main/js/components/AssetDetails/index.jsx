import { Grid, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TemplateProfileContext } from '../../app'

function AssetField({fieldName, fieldValue}) {
    return (
        <Grid item xs={6}>
            <Grid container>
                <Grid item xs={4}><strong>{fieldName}</strong></Grid>
                <Grid item xs={6}>{fieldValue}</Grid>
            </Grid>
        </Grid>
    )
}

export default function AssetDetails() {
    const [asset, setAsset] = useState([])
    const profileContext = useContext(TemplateProfileContext)
 
    useEffect(() => {
        axios.get('http://localhost:8080/api/profile/assets', {headers: {Accept: 'application/schema+json'}})
            .then(response => response.data.properties)
            .then(fields => {
                console.log()
                let inputs = Object.entries(fields).filter(field => field[1].format != 'uri').map((field, index) => {
                    return (
                        <AssetField key={index} fieldName={field[1].title} fieldValue='Field Value' />    
                    )
                })
                setAsset(inputs)
            })
    }, [])

    useEffect(() => {console.log(profileContext.length > 0 ? profileContext.filter(i => i.rel == 'assets') : '')})

    return (
        <>
            <Grid container>
                <Typography variant="h4" component="h1">Asset Details</Typography>
                <Grid container spacing={2}>
                    {asset}
                </Grid>
            </Grid>
        </>
    )
}