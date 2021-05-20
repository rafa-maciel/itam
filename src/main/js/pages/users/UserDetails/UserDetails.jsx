import { Grid, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { apiNav, apiNavParam, getURLFromEntitySearch } from '../../../api/api'
import { APIUrlsContext } from '../../../app'
import { AssetTable } from '../../../components/assets'
import { UserInfo } from '../../../components/users'

export default function UserDetails() {
    const { state: { userURI }} = useLocation()
    const { assets:assetsUrl } = useContext(APIUrlsContext)

    const [ user, setUser ] = useState([])
    const [ assetsOwn, setAssetsOwn ] = useState([])

    useEffect(() => {
        if ( userURI ) {
            apiNav(userURI)
                .then(data => {
                    setUser(data)
                })
        } 
    }, [ userURI ])

    useEffect(() => {
        if ( user && assetsUrl ) {
            getURLFromEntitySearch(assetsUrl.href, "allFromOwner")
                .then(data => apiNavParam(data, { ownerRe: user.re }))
                .then(assetsData => assetsData._embedded.assets)
                .then(assets => setAssetsOwn(assets))
        }
    }, [ user, assetsUrl ])

    
    return (
        <>
            <Grid container>
                <UserInfo user={ user } />

                <Typography variant="h5">Assets</Typography>
                <Grid container spacing={2}>
                    <AssetTable assets={ assetsOwn } />
                </Grid>
            </Grid>

            
        </>
    )
}