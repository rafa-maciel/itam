import { Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { EntityFieldInfo } from '../../utils/controls'

export default function UserInfo({ user }) {
    const [ userFields, setUserFields ] = useState([])

    useEffect(() => {
        if (user) {
            let entityFields = Object.entries(user)
                .filter(field => field[0] != "_links")
                .map((field, index) => <EntityFieldInfo name={field[0]} value={field[1]} key={ index } />)

            setUserFields(entityFields)                
        }
    }, [ user ])
    
    return (
        <>
            <Typography variant="h4" component="h1">User Details</Typography>
            <Grid container spacing={2}>
                { userFields }
            </Grid>
        </>
    )
}