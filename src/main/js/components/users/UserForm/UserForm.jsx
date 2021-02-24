import React, { useContext, useState } from 'react'
import { DomainSchemasContext } from '../../../app'


export default function UserForm() {
    const {user:userSchema} = useContext(DomainSchemasContext)
    const [formFields, setFormFields] = useState([])
    const [values, setValues] = useState({})

    useEffect(() => {
        if (userSchema) {
            
        }
    }, [userSchema])
}