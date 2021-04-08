import React, { useContext, useEffect, useState } from 'react'
import { apiNav } from '../../../api/api'
import { APIUrlsContext } from '../../../app'
import { UserTable } from '../../../components/users'

export default function UserDashboard() {
    const { users:userRootUrl } = useContext(APIUrlsContext)
    const [apiURL, setApiURL] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (userRootUrl) setApiURL(userRootUrl.href)
    }, [userRootUrl])

    useEffect(() => {
        if (apiURL) findAndListUsers()
    }, [apiURL])

    const findAndListUsers = () => {
        if (apiURL) {
            apiNav(apiURL)
                .then(data => data._embedded.users)
                .then(apiUsers => setUsers(apiUsers))
        }
    }

    return (
        <>
            <UserTable users={users} onItemsChange={findAndListUsers}/>
        </>
    )
}