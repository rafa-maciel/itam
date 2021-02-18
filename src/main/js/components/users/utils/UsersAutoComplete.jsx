import React, { useContext, useEffect, useState } from 'react'
import { apiNav } from '../../../api/api'
import { APIUrlsContext } from '../../../app'
import { AutoCompleteFormField } from '../../utils/forms'

export default function UsersAutoComplete({fieldName, fieldLabel, handleFieldChange}) {
    const {users:usersURL} = useContext(APIUrlsContext)
    const [fieldOptions, setFieldOptions] = useState([])

    useEffect(() => {
        if(usersURL) {
            apiNav(usersURL.href)
                .then(data => data._embedded.users)
                .then(users => users.map(user => {
                        return {
                            name: fieldName,
                            label: user.name, 
                            department: user.department,
                            uri: user._links.self.href
                        }
                })).then(options => setFieldOptions(options))
        }

    }, [usersURL])

    return (
        <AutoCompleteFormField name={fieldName} label={fieldLabel} options={fieldOptions} onChange={handleFieldChange} />
    )
}