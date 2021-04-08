import React, { useEffect, useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import { SchemaFormField } from '.'

export default function SchemaForm({ domainSchema, onSubmit, initialData}) {
    const [formFields, setFormFields] = useState([])
    const [values, setValues] = useState({})

    useEffect(() => {
        if (domainSchema) {
            let components = Object.entries(domainSchema)
                .map(schema => { return { name: schema[0], values: schema[1]}})
                .filter(field => field.values.format != "uri")
                .map((field, index) => (
                    <SchemaFormField
                        key={index}
                        name={field.name}
                        defaultValue={ initialData ? initialData[field.name] : "" }
                        values={field.values}
                        onChange={handleFieldChange} />
                ))

            setFormFields([ ...components ])
        }
    }, [domainSchema])

    useEffect(() => {
        if( initialData && JSON.stringify(initialData) !== "{}" ) {
            Object.entries(initialData)
                .filter(data => data[0] != "_links")
                .map(data => { return {name: data[0], value: data[1]}})
                .forEach(data => handleFieldChange(data.name, data.value))
        }
    }, [ initialData ])

    const handleFieldChange = (name, value) => {
        let newValues = values
        newValues[name] = value
        setValues(newValues)
    } 

    const handleFormSubmit = event => {
        event.preventDefault();
        onSubmit(values)
    }


    return (
        <>
            <form>
                <Grid container spacing={3}>
                    {formFields.map((field, index) => (
                        <Grid key={index} item xs={12} md={6}>{field}</Grid>
                    ))}
                </Grid>
                
                <Button type="button" onClick={handleFormSubmit}>Save</Button>
            </form>
        </>
    )
}