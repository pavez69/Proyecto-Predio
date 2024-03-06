import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Auth0Provider} from '@auth0/auth0-react'


import 'bootstrap/dist/css/bootstrap.min.css';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain='dev-llgu543gm5257imw.us.auth0.com'
    clientId='UuU7la8qYys0V2zznB8FgeHsv5YANjDA'
    redirectUri={window.location.origin}>
    <App />
    </Auth0Provider>
  </React.StrictMode>,
);
