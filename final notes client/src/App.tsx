import React, { useState } from 'react';
import logo from './logo.svg';
import Login from './components/login'
import { Paper,Button, CardHeader, Input, Tabs, Tab} from '@material-ui/core';
import Notes from './components/Notes'
import './App.css';

function App() {

  const [state, updateState] = useState({tab:'signin'})

  return (
    <div style={{display:"flex" , justifyContent:"center", flexDirection:'column'}}>
      
      <br/>

    </div>
  );

  return (
    <Notes/>
  )
}

export default App;
