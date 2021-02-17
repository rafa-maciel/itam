import React, { useContext, useEffect, useState } from 'react'
import { apiNav } from '../../../api/api'
import { APIUrlsContext } from '../../../app'
import { AutoCompleteFormField } from '../../utils/forms'

export default function LocationsAutoComplete({fieldName, fieldLabel, handleFieldChange}) {
    const {locations: locationsURL} = useContext(APIUrlsContext)
    const [fieldOptions, setFieldOptions] = useState([])

    useEffect(() => {
        if(locationsURL) {
            apiNav(locationsURL.href)
                .then(data => data._embedded.locations)
                .then(locations => locations.map(location => {
                        return {
                            name: fieldName,
                            label: location.title, 
                            city: location.city,
                            uri: location._links.self.href
                        }
                })).then(options => setFieldOptions(options))
                
        }
    }, [locationsURL])

    return (
        <AutoCompleteFormField name={fieldName} label={fieldLabel} options={fieldOptions} onChange={handleFieldChange} />
    )

}