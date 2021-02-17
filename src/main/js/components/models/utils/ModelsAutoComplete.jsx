import React, { useContext, useEffect, useState } from 'react'
import { apiNav } from '../../../api/api'
import { APIUrlsContext } from '../../../app'
import { AutoCompleteFormField } from '../../utils/forms'

export default function ModelsAutoComplete({fieldName, fieldLabel, handleFieldChange}) {
    const {deviceModels: modelsURL} = useContext(APIUrlsContext)
    const [fieldOptions, setFieldOptions] = useState([])

    useEffect(() => {
        if (modelsURL) {
            apiNav(modelsURL.href)
                .then(data => data._embedded.deviceModels)
                .then(models => models.map(model => {
                        return {
                            name: 'model',
                            label: model.model, 
                            brand: model.brand,
                            uri: model._links.self.href
                        }
                    })
                ).then(options => setFieldOptions(options))
        }
    }, [modelsURL])

    return (
        <AutoCompleteFormField name={fieldName} label={fieldLabel} options={fieldOptions} onChange={handleFieldChange} />
    )
}
