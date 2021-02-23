import React, { useContext, useEffect, useState } from 'react'

import { Button, Grid, Typography } from '@material-ui/core'
import { DomainSchemasContext } from '../../../app'

import { ModelsAutoComplete } from '../../models/utils';
import { LocationsAutoComplete } from '../../locations/utils';
import { UsersAutoComplete} from '../../users/utils';

import './style.css';
import { FormField, SwitchField, NumberField, SelectField } from '../../utils/forms';
import { apiNavMany } from '../../../api/api';
import { UserFindDialog } from '../../users';

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
                    
                    if (schema[1].type == "boolean") {
                        return (
                            <SwitchField 
                                key={index} 
                                label={schema[1].title} 
                                name={schema[0]} 
                                onChange={switchChangeHandler} 
                                defaultValue={initialData ? initialData[schema[0]] : false}/>
                        )
                    }
                    
                    if(schema[1].type == "integer") {
                        return (
                            <NumberField 
                                defaultValue={initialData ? initialData[schema[0]] : 0}
                                key={index} 
                                name={schema[0]} 
                                label={schema[1].title} 
                                onChange={changeHandler} />
                        )
                    }

                    if (schema[1].enum) {
                        return <SelectField 
                            defaultValue={initialData ? initialData[schema[0]] : null}
                            label={schema[1].title}
                            name={schema[0]} 
                            onChange={changeHandler}
                            items={schema[1].enum} />
                    }

                    

                    return (
                        <FormField 
                            key={index} 
                            defaultValue={initialData ? initialData[schema[0]] : ''}
                            id={schema[0]} 
                            name={schema[0]} 
                            label={schema[1].title} 
                            onChange={changeHandler}/>
                        )
                    }
                )
            setAssetFields([...components])
        }
    }, [assetSchema, initialData])

    // function prepareAssetRelObj(data) {
    //     return {
    //         owner: {
    //             url: data._links.owner.href
    //         },
    //         location: {
    //             url: data._links.location.href 
    //         },
    //         model: {
    //             url: data._links.model.href
    //         }
    //     }
    // }

    // useEffect(() => {
    //     if (JSON.stringify(initialData) !== "{}") {
    //         console.log(initialData)
    //         let assetRel = prepareAssetRelObj(initialData)

    //         let urls = [...Object.keys(assetRel).map(key => assetRel[key].url)]

    //         apiNavMany(urls)
    //             .then(responses => responses.map(resp => {
    //                 return {
    //                 url: resp.config.url,
    //                 data: resp.data
    //             }}))
    //             .then(data => {
    //                 let arrRel = Object.entries(assetRel)

    //                 data.forEach(item => {
    //                     let relKey = arrRel.filter(rel => rel[1].url == item.url)[0][0]
    //                     assetRel[relKey] = {...item.data}
    //                 })

    //                 initialData = {...initialData, ...assetRel}
    //                 console.log(initialData)
    //             })
    //     }
    // }, [initialData])

    const changeHandler = e => { 
        let newValues = values
        newValues[e.target.name] = e.target.value
        setValues(newValues)
    }
    
    const selectChangeHandler = (name, value) => {
        let newValues = values
        newValues[name] = value
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
                        {/* <UsersAutoComplete 
                            fieldLabel="Device Owner" 
                            fieldName="owner" 
                            handleFieldChange={selectChangeHandler} 
                            userDefault={initialData ? initialData.owner : ''}/> */}
                        <UserFindDialog name="owner" label="Device Owner" handleValueChange={selectChangeHandler}/>
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