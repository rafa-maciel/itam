import React, { useContext, useEffect, useState } from 'react'

import { Button, Grid, Typography } from '@material-ui/core'
import { DomainSchemasContext } from '../../../app'

import { ModelsAutoComplete } from '../../models/utils';
import { LocationsAutoComplete } from '../../locations/utils';
import { UsersAutoComplete } from '../../users/utils';

import './style.css';
import { FormField, SwitchField } from '../../utils/forms';

export default function AssetForm({onFormSubmit, formLabel, submitButtonLabel}) {
    const {asset:assetSchema} = useContext(DomainSchemasContext)
    const [assetFields, setAssetFields] = useState([])
    const [values, setValues] = useState({})

    useEffect(() => {
        if (assetSchema) {
            let schemaArr = Object.entries(assetSchema)
            let components = schemaArr
                .filter(schema => schema[1].format != "uri")
                .map((schema, index) => {
                    
                    if (schema[1].type == "boolean") {
                        return (
                            <SwitchField key={index} label={schema[1].title} name={schema[0]} onChange={switchChangeHandler} />
                        )
                    }

                    let inputProps = {}
                    if (schema[1].enum) {
                        inputProps.select = true
                        inputProps.selectItems = schema[1].enum
                    }

                    if(schema[1].type == "integer") {
                        inputProps.number = true
                    }

                    return (
                        <FormField 
                            key={index} 
                            id={schema[0]} 
                            name={schema[0]} 
                            label={schema[1].title} 
                            onChange={changeHandler}
                            inputProps={inputProps} />
                        )
                    }
                )
            setAssetFields([...assetFields, ...components])
        }
    }, [assetSchema])

    const changeHandler = e => { 
        let newValues = values
        newValues[e.target.name] = e.target.value
        setValues(newValues)
    }
    
    const selectChangeHandler = (e, value, reason) => {
        let newValues = values
        newValues[value.name] = value.uri
        setValues(newValues)
    }

    const switchChangeHandler = e => {
        let newValues = values
        newValues[e.target.name] = e.target.checked
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
                        <UsersAutoComplete fieldLabel="Device Owner" fieldName="owner" handleFieldChange={selectChangeHandler} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocationsAutoComplete fieldLabel="Device Location" fieldName="location" handleFieldChange={selectChangeHandler} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ModelsAutoComplete fieldLabel="Device Model" fieldName="model" handleFieldChange={selectChangeHandler} />
                    </Grid>
                </Grid>
                <Button type="submit">{submitButtonLabel}</Button>
            </form>
        </>
    )
}