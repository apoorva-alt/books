
import axios from 'axios';
import React, { ReactElement,useContext,useState } from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
    
}

export default function AddMovie({}: Props): ReactElement {


    const [user, setMovie] = useState({
        email:'',
        password:''
    })
    let history=useHistory();
    const inputEvent=(event:any)=>{
        let value=event.target?.value
        let name=event.target?.name 
        setMovie(prevMovie => ({ ...prevMovie, [name]: value }));
    }
    const submitFormDetails=(e:any)=>{
        e.preventDefault()
        // console.log(Movie);
        axios.post("http://localhost:4000/createUser",user)
        .then((res)=>{
            console.log(res.data)
            if(res.data.message == "success"){
               alert("User Created");
            }   
            else{
                alert(res.data);
            }        
            
        })
    }
  
    return (
        <div className="imp">
            <h4 className='title'style={{marginTop:"-5%", color:"wheat"}}>Add A New User</h4>
            <form  onSubmit={submitFormDetails} className="addMovieForm" style={{margin:"10%"}}>
                <div className="form-group">
                    <label htmlFor="author" >User Email</label>
                    <input type="text" className="form-control" name="email" onChange={inputEvent} id="email" placeholder="Email" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="author" >Password</label>
                    <input type="password" className="form-control" name="password" onChange={inputEvent} id="password" placeholder="Password" required/>
                </div>
                <div className="submitform">
                <button type="submit" className="btn btn-dark">Submit</button>
                </div>
                </form>
        </div>
    )
}

