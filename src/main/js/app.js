const React = require('react');
const ReactDOM = require('react-dom');
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { AssetCreate, AssetDetails, AssetTable, AssetUpdate } from './components/assets';
import { MainLayout } from './pages';

export const DomainSchemasContext = React.createContext({})
export const APIUrlsContext = React.createContext({})

const domainSchemasUrl = 'http://localhost:8080/api/profile/'
const apiRootUrl = 'http://localhost:8080/api/'
 
const App = () => {
    const [domainSchemas, setDomainSchemas] = useState({})
    const [apiUrls, setApiUrls] = useState({})

    useEffect(() => {
        axios.get(domainSchemasUrl, {headers: {Accept: 'application/schema+json'}})
            .then(response => response.data.links)
            .then(links => {
                axios.all(links.filter(item => item.rel != 'self').map(url => axios.get(url.href, {headers: {Accept: 'application/schema+json'}})))
                    .then(axios.spread((...responses) => {
                        let schemas = {}
                        responses.map(resp => resp.data).forEach(data => {schemas[data.title.replace(/\s+/g, '').toLowerCase()] = data.properties})
                        setDomainSchemas(schemas)
                    }))
            })
    }, [])

    useEffect(() => {
        axios.get(apiRootUrl)
            .then(response => response.data._links)
            .then(links => setApiUrls(links))
    }, [])

    return (
        <DomainSchemasContext.Provider value={domainSchemas}>
            <APIUrlsContext.Provider value={apiUrls}>
                <Router >
                    <MainLayout>    
                        <Switch>
                            <Route path="/app" exact={true}>
                                <AssetTable />
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
                            
                        </Switch>
                    </MainLayout>
                </Router>
            </APIUrlsContext.Provider>
        </DomainSchemasContext.Provider>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

