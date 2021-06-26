import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import RootRoute from './routes'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Button, CardHeader, Input, Card, Tabs, Tab } from '@material-ui/core';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
  <CardHeader style={{display:"flex" , justifyContent:"center", flexDirection:'column'}} title="Notes"/>
    <RootRoute />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
