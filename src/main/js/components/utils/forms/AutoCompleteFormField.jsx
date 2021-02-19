import React from 'react'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useEffect } from 'react'
import { useState } from 'react'

export default function AutoCompleteFormField({id, label, onChange, options, defaultValue}) {
    const [optionSelected, setOptionSelected] = useState(null)

    useEffect(() => {
        console.log(defaultValue)
        if(defaultValue && JSON.stringify(defaultValue) !== "{}") {
            setOptionSelected(defaultValue)
        }
    }, [defaultValue])


    function handleOnChange(e, value) {
        setOptionSelected(value)
        onChange(e, value)
    }

    return (
        <>
            <Autocomplete
                id={id}
                value={ optionSelected }
                options={ options }
                getOptionLabel={(option) => JSON.stringify(option) !== "{}" ? option.label : ""}
                onChange={handleOnChange}
                renderInput={(params) => {
                    return <TextField {...params} label={label}/>
                }}

                />
        </>
    )
}