import React, { useState, useEffect } from 'react'
import { NumberField, SelectField, SwitchField, FormField } from '.'

const fieldType = {
    integer: NumberField,
    boolean: SwitchField,
    enum: SelectField,
    string: FormField
}


export default function SchemaFormField({name, values, defaultValue, onChange}) {
    const [formField, setFormField] = useState(null)

    useEffect(() => {
        if (name && JSON.stringify(values) !== "{}") {
            let inputProps = {
                name,
                label: values.title,
                defaultValue,
                onChange,
                items: values.enum           
            }
            let type = values.enum ? "enum" : values.type
            let newField = new fieldType[type]({ ...inputProps })
            setFormField(newField)
        }
    }, [name, values])

    return (
        <>
            {formField}
        </>
    )
}