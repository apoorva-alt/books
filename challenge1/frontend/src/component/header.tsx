import React, { ReactElement, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

interface Props {
  forSearch:Function
}

export default function Header({forSearch}: Props): ReactElement {
  const [showAddButton, setshowAddButton] = useState(false)
  if(window.location.href == "http://localhost:3000/")
  var login = false;
  else
  var login =true
  useEffect(()=>{
    if(!login){
      setshowAddButton(true)
    }
    else{
      setshowAddButton(false)
    }
  },[]) 


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <h2 className="navbar-brand-titleOne" style={{marginLeft:"2%", fontStyle:"italic"}}>Directors Apps</h2>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> 
        <div className="collapse navbar-collapse" id="navbarNav" >
        <div className="nav navbar-right" style={{marginLeft:"60%"}}>
         <ul className="navbar-nav" >
         {login? <li className="nav-item active">
            <Link className="nav-link" to="/display" >Directors<span className="sr-only">(current)</span></Link>
            </li>:null}
           {login?<li className="nav-item active">
            <Link className="nav-link" to="/addDirectors" >Add Director</Link>
            </li>:null}
            {showAddButton?<li className="nav-item active">
             <Link className="nav-link" to="/" >Login</Link>
            </li>:<li className="nav-item active">
             <a className="nav-link" href="http://localhost:3000/">Logout</a>
            </li>}
            <li className="nav-item active">
            <Link className="nav-link" to="/register" >Register</Link>
            </li>
          </ul>
          
        </div>
        </div>
      </nav>
        </>
    )
}