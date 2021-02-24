import React, { useContext, useEffect, useState } from 'react'

import { Button, Grid, Typography } from '@material-ui/core'
import { DomainSchemasContext } from '../../../app'

import { SchemaFormField } from '../../utils/forms';
import { UserFindDialog } from '../../users';

import './style.css';

export default function AssetForm({onFormSubmit, formLabel, submitButtonLabel, initialData}) {
    const {asset:assetSchema} = useContext(DomainSchemasContext)
    const [assetFields, setAssetFields] = useState([])
    const [values, setValues] = useState({})

    useEffect(() => {
        if (assetSchema && JSON.stringify(initialData) !== "{}") {
            let schemaArr = Object.entries(assetSchema)
            let components = schemaArr
                .filter(schema => schema[1].format != "uri")
                .map((schema, index) => {
                    return (
                        <SchemaFormField 
                            key={index}
                            defaultValue={initialData ? initialData[schema[0]] : ""}
                            name={schema[0]} 
                            values={schema[1]} 
                            onChange={handleInputChange} />
                    )})

            setAssetFields([...components])
        }
    }, [assetSchema, initialData])

    const handleInputChange = (name, value) => {
        let newValues = values
        newValues[name] = value
        setValues(newValues)
    }

    const submitHandler = e => {
        onFormSubmit(e, values)
    }

    return (
        <>
            <Typography variant="h3" component="h1">{formLabel}</Typography>
            <form onSubmit={submitHandler}>
                <Grid container spacing={3}>
                    {assetFields.map((field, index) => <Grid key={index} item xs={12} md={6}>{field}</Grid>)}

                    <Grid item xs={12} md={6}>
                        {/* <UsersAutoComplete 
                            fieldLabel="Device Owner" 
                            fieldName="owner" 
                            handleFieldChange={selectChangeHandler} 
                            userDefault={initialData ? initialData.owner : ''}/> */}
                        <UserFindDialog name="owner" label="Device Owner" handleValueChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* <LocationsAutoComplete fieldLabel="Device Location" fieldName="location" handleFieldChange={selectChangeHandler} /> */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* <ModelsAutoComplete fieldLabel="Device Model" fieldName="model" handleFieldChange={selectChangeHandler} /> */}
                    </Grid>
                </Grid>
                <Button type="submit">{submitButtonLabel}</Button>
            </form>
        </>
    )
}