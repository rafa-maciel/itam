import React, { useContext, useEffect, useState } from 'react'

import { Button, Grid, Typography } from '@material-ui/core'
import { apiNav, apiPost } from '../../api/api';
import { APIUrlsContext, DomainSchemasContext } from '../../app'
import { AutoCompleteFormField, FormField, SwitchField } from '../utils/forms/index.jsx';

import './style.css';

export default function AssetForm() {
    const {asset:assetSchema} = useContext(DomainSchemasContext)
    const {assets:assetURL, users:ownersURL, locations:locationsURL, deviceModels: modelsURL} = useContext(APIUrlsContext)

    const [assetFields, setAssetFields] = useState([])
    const [onwerField, setOwnerField] = useState(null)
    const [locationField, setLocationField] = useState(null)
    const [modelField, setModelField] = useState(null)

    const [values, setValues] = useState({})
    
    useEffect(() => {
        if(modelsURL) {
            apiNav(modelsURL.href)
                .then(data => data._embedded.deviceModels)
                .then(models => {
                    let fieldOptions = models.map(model => {
                        return {
                            name: 'model',
                            label: model.model, 
                            brand: model.brand,
                            uri: model._links.self.href
                        }
                    })

                    setModelField(
                        <AutoCompleteFormField 
                            key='model-complete' 
                            name='model' 
                            label='Model' 
                            options={fieldOptions} 
                            onChange={selectChangeHandler}/>)
                })
        }
    }, [modelsURL])

    useEffect(() => {
        if(locationsURL) {
            apiNav(locationsURL.href)
                .then(data => data._embedded.locations)
                .then(locations => {
                    let fieldOptions = locations.map(location => {
                        return {
                            name: 'location',
                            label: location.title, 
                            city: location.city,
                            uri: location._links.self.href
                        }
                    })

                    setLocationField(
                        <AutoCompleteFormField 
                            key='location-complete' 
                            label='Location' 
                            options={fieldOptions} 
                            onChange={selectChangeHandler}/>)
                })
        }
    }, [locationsURL])

    useEffect(() => {
        if(ownersURL) {
            apiNav(ownersURL.href)
                .then(data => data._embedded.users)
                .then(users => {
                    let fieldOptions = users.map(user => {
                        return {
                            name: 'owner',
                            label: user.name, 
                            department: user.department,
                            uri: user._links.self.href
                        }
                    })

                    setOwnerField(
                        <AutoCompleteFormField 
                            key='owner-complete' 
                            label='Owner' 
                            options={fieldOptions} 
                            onChange={selectChangeHandler} 
                            />)
                })
        }
    }, [ownersURL])

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
        e.preventDefault();
        apiPost(assetURL.href, values)
            .then(response => {
                console.log(response.status)
                console.log(response)
            })
    }

    useEffect(() => {
        if (assetSchema) {
            let schemaArr = Object.entries(assetSchema)
            let components = schemaArr
                .filter(schema => schema[1].format != "uri")
                .map((schema, index) => {
                    
                    if (schema[1].type == "boolean") {
                        return <SwitchField key={index} label={schema[1].title} name={schema[0]} onChange={switchChangeHandler} />
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

    return (
        <>
            <Typography variant="h3" component="h1">Create</Typography>
            <form onSubmit={submitHandler}>
                <Grid container spacing={3}>
                    {assetFields}
                    {onwerField}
                    {locationField}
                    {modelField}
                </Grid>
                <Button type="submit">Create Asset</Button>
            </form>
        </>
    )
}