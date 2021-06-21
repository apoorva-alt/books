import React, { useState } from 'react';
import logo from './logo.svg';
import Login from './components/login'
import { Paper,Button, CardHeader, Input, Tabs, Tab} from '@material-ui/core';
import './App.css';

function App() {

  const [state, updateState] = useState({tab:'signin'})

  return (
    <div style={{display:"flex" , justifyContent:"center", flexDirection:'column'}}>
      <CardHeader style={{display:"flex" , justifyContent:"center", flexDirection:'column'}} title="Notes"/>
      <br/>
      <div style={{display:"flex" , flexDirection:'column', alignItems:'center'}}>
      <Tabs
        value={state.tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e) => console.log("val", e.target)}
      >
        <Tab label="Sign In" key="signin" onClick={() => updateState({tab:'signin'})}/>
        <Tab label="Sign up" key="signup" onClick={() => updateState({tab:'signup'})}/>
      </Tabs>
      <Login type={state.tab}/>
      </div>
    </div>
  );
}

export default App;
