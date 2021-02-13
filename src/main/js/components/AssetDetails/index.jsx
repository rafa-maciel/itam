import { Grid, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { DomainSchemasContext } from '../../app'

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
    const domainSchemasContext = useContext(DomainSchemasContext)

    const [assetFields, setAssetFields] = useState([])
    const [modelFields, setModelFields] = useState([])
    const [locationFields, setLocationFields] = useState([])
    const [ownerFields, setOwnerFields] = useState([])
 
    function getAssetFieldFromShema(schema) {
        let fields = Object.entries(schema)
        let fieldComponents = fields.filter(field => field[1].format != 'uri').map((field, index) => {
            return (
                <AssetField key={index} fieldName={field[1].title} fieldValue='Field Value' />    
            )
        })

        return fieldComponents
    }

    useEffect(() => {
        if ("asset" in domainSchemasContext) setAssetFields([...assetFields, ...getAssetFieldFromShema(domainSchemasContext.asset)])
        if ("devicemodel" in domainSchemasContext) setModelFields([...modelFields, ...getAssetFieldFromShema(domainSchemasContext.devicemodel)])
        if ("location" in domainSchemasContext) setLocationFields([...locationFields, ...getAssetFieldFromShema(domainSchemasContext.location)])
        if ("user" in domainSchemasContext) setOwnerFields([...ownerFields, ...getAssetFieldFromShema(domainSchemasContext.user)])
    }, [domainSchemasContext])

    return (
        <>
            <Grid container>
                <Typography variant="h4" component="h1">Asset Details</Typography>
                <Grid container spacing={2}>
                    {assetFields}
                </Grid>
                <Typography variant="h5">Asset Model</Typography>
                <Grid container spacing={2}>
                    {modelFields}
                </Grid>
                <Typography variant="h5">Location</Typography>
                <Grid container spacing={2}>
                    {locationFields}
                </Grid>
                <Typography variant="h5">Onwer</Typography>
                <Grid container spacing={2}>
                    {ownerFields}
                </Grid>
            </Grid>
        </>
    )
}