const React = require('react');
const ReactDOM = require('react-dom');
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AssetDetails from './components/AssetDetails/index.jsx';
import AssetTable from './components/AssetTable/index.jsx';

export const DomainSchemasContext = React.createContext({})
const domainSchemasUrl = 'http://localhost:8080/api/profile/'
 
const App = () => {
    const [domainSchemas, setDomainSchemas] = useState({})

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

    return (
        <DomainSchemasContext.Provider value={domainSchemas}>
            <Router >
                <Switch>
                    <Route path="/" exact={true}>
                        <AssetDetails />
                    </Route>
                </Switch>
            </Router>
        </DomainSchemasContext.Provider>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

