const React = require('react');
const ReactDOM = require('react-dom');
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { apiNav, apiNavSchema } from './api/api';
import { Authentication, MainLayout } from './pages';
import { AssetCreate, AssetList, AssetUpdate, AssetDetails } from './pages/assets';
import { LocationDashboard } from './pages/locations';
import { ModelDashboard } from './pages/models';
import { UserDashboard, UserDetails } from './pages/users';

export const DomainSchemasContext = React.createContext({})
export const APIUrlsContext = React.createContext({})

const domainSchemasUrl = 'http://localhost:8080/api/profile/'
const apiRootUrl = 'http://localhost:8080/api/'
 
const App = () => {
    const [domainSchemas, setDomainSchemas] = useState({})
    const [apiUrls, setApiUrls] = useState({})
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('ITAM_TOKEN_AUTH')
        if (!authenticated && token)
            setAuthenticated(true)
        if (authenticated && !token)
            setAuthenticated(false)
    }, [authenticated])

    useEffect(() => {
        if (authenticated) (
            apiNavSchema(domainSchemasUrl)
                .then(response => response.links)
                .then(links => {
                    axios.all(links.filter(item => item.rel != 'self').map(url => apiNavSchema(url.href)))
                        .then(axios.spread((...responses) => {
                            let schemas = {}
                            responses.forEach(data => {schemas[data.title.replace(/\s+/g, '').toLowerCase()] = data.properties})
                            setDomainSchemas(schemas)
                        }))
                })
                .catch(error => {console.log(error)})
        )
    }, [authenticated])

    useEffect(() => {
        if (authenticated) (
            apiNav(apiRootUrl)
                .then(response => response._links)
                .then(links => setApiUrls(links))
        )
    }, [authenticated])

    const AppHomePage = () => {
        return (
        <DomainSchemasContext.Provider value={domainSchemas}>
            <APIUrlsContext.Provider value={apiUrls}>
                <Router >
                    <MainLayout>    
                        <Switch>
                            <Route path="/app" exact={true}>
                                <AssetList />
                            </Route>
                            <Route path="/app/assets/add">
                                <AssetCreate />
                            </Route>
                            <Route path="/app/assets/update/:serialNumber">
                                <AssetUpdate />
                            </Route>
                            <Route path="/app/assets/:serialNumber">
                                <AssetDetails />
                            </Route>
                            <Route path="/app/users/:re">
                                <UserDetails />
                            </Route>
                            <Route path="/app/users">
                                <UserDashboard />
                            </Route>
                            <Route path="/app/locations">
                                <LocationDashboard />
                            </Route>
                            <Route path="/app/models">
                                <ModelDashboard />
                            </Route>
                            
                        </Switch>
                    </MainLayout>
                </Router>
            </APIUrlsContext.Provider>
        </DomainSchemasContext.Provider>
        )
    }

    const AppNonAuthenticatedPage = () => {
        return <Authentication onSuccessfulyAuthenticated={() => setAuthenticated(true)} />
    }

    const AppPage = () => {
        if (authenticated) 
            return (<AppHomePage />)
        else
            return (<AppNonAuthenticatedPage />)
    }

    return (
        <AppPage />
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

