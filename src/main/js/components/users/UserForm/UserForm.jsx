import { Button } from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react'
import { DomainSchemasContext } from '../../../app'
import { SchemaFormField } from '../../utils/forms'


export default function UserForm({onSubmit}) {
    const {user:userSchema} = useContext(DomainSchemasContext)
    const [formFields, setFormFields] = useState([])
    const [values, setValues] = useState({})

    useEffect(() => {
        if (userSchema) {
            let components = Object.entries(userSchema)
                .map(schema => {
                    return {
                        name:schema[0],
                        values:schema[1]
                    }
                })
                .filter(field => field.values.format != "uri")
                .map((field, index) => (
                    <SchemaFormField 
                        key={index} 
                        name={field.name} 
                        values={field.values} 
                        onChange={handleInputChange} />
                ))
            setFormFields([...components])
        }
    }, [userSchema])

    const handleInputChange = (name, value) => {
        let newValues = values
        newValues[name] = value
        setValues(newValues)
    }

    const handleFormSubmit = event => {
        onSubmit(values)
    }

    return (
        <>
            <form>
                {formFields}
                <Button type="button" onClick={handleFormSubmit}>Create</Button>
            </form>
        </>
    )
}