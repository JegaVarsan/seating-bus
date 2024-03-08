import React from 'react';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import Home from './Home';
import Protected from './Protected';

const oktaAuth = new OktaAuth({
    issuer: 'https://dev-91078121-admin.okta.com/oauth2/default',
    clientId: '0oafn578u6V5jKnS45d7',
    redirectUri: window.location.origin + '/login/callback'
});

const App = () => {
    const history = useHistory();
    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };

    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <Route path='/' exact={true} component={Home} />
            <SecureRoute path='/protected' component={Protected} />
            <Route path='/login/callback' component={LoginCallback} />
        </Security>
    );
};

const Oktalogin = () => (
    <Router>
        <App />
    </Router>
);

export default Oktalogin;