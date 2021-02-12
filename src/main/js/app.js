const React = require('react');
const ReactDOM = require('react-dom');
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AssetDetails from './components/AssetDetails/index.jsx';
import AssetTable from './components/AssetTable/index.jsx';

export const TemplateProfileContext = React.createContext({})
 
const App = () => {
    const [templateProfiles, setTemplateProfiles] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8080/api/profile/', {headers: {Accept: 'application/schema+json'}})
            .then(response => response.data.links)
            .then(links => {
                setTemplateProfiles(links)   
            })
    }, [])

    return (
        <TemplateProfileContext.Provider value={templateProfiles}>
            <Router >
                <Switch>
                    <Route path="/" exact={true}>
                        <AssetDetails />
                    </Route>
                </Switch>
            </Router>
        </TemplateProfileContext.Provider>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

