
import axios from 'axios';
import React, { ReactElement,useContext,useState } from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
    
}

export default function AddMovie({}: Props): ReactElement {


    const [Movie, setMovie] = useState({
        name:'',
        age:0,
        description:'',
        gender:'',
        url: ''
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
        axios.post("http://localhost:4000/create",Movie)
        .then((res)=>{
            console.log(res.data)
            if(res.data.message == "success"){
                history.push('/display')
            }   
            else{
                alert(res.data);
            }        
            
        })
    }
  
    return (
        <div className="imp">
            <h4 className='title'style={{marginTop:"-5%"}}>Add A New Director</h4>
            <form  onSubmit={submitFormDetails} className="addMovieForm" style={{margin:"10%"}}>
                <div className="form-group">
                    <label htmlFor="author" >Director Name</label>
                    <input type="text" className="form-control" name="name" onChange={inputEvent} id="name" placeholder="Movie Director" required/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">About Director</label>
                    <textarea className="form-control" name="description" onChange={inputEvent} id="description" rows={2} placeholder="about the Movie" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="cover">Age</label>
                    <input type="number" className="form-control" name="age" onChange={inputEvent} id="age" placeholder="age" required/>
                </div>
                <div className="form-row">
                <div className="col">
                    <label htmlFor="price">Gender</label>
                    <input type="text" className="form-control" name="gender" onChange={inputEvent} placeholder="gender" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="author" >Image Url</label>
                    <input type="text" className="form-control" name="Url" onChange={inputEvent} id="Url" placeholder="Image Url" required/>
                </div>
                </div>
                <div className="submitform">
                <button type="submit" className="btn btn-dark">Submit</button>
                </div>
                </form>
        </div>
    )
}

