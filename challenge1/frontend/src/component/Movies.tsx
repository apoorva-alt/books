
import axios from 'axios';
import React, { ReactElement,useContext,useState,useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

interface Props {
    
}

export default function AddMovie({}: Props): ReactElement {
    let params = useParams<any>();
    const [Movies2, set1Movie] = useState({
        id : params.id
    })

    const [Movies3, set3Movie] = useState([])
    useEffect( () => {
        (async ()=>{
           await axios.post("http://localhost:4000/moviesDetails", Movies2)
           .then((res:any)=> {
            console.log(res.data);
            set3Movie(res.data);
           })
           .catch((err)=>console.log(err.message))
        })()
   },[])

    console.log(params);
    const [Movies1, setMovie] = useState({
        name:'',
        DirId:params.id
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
        axios.post("http://localhost:4000/movieDetails",Movies1)
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
            <h4 className='title'style={{marginTop:"-5%",color:"wheat"}}>Movies By The Director</h4>
            <form  onSubmit={submitFormDetails} className="addMovieForm" style={{margin:"10%"}}>
                <div className="form-group">
                    <label htmlFor="author" >Add Movies</label>
                    <input type="text" className="form-control" name="name" onChange={inputEvent} id="name" placeholder="Movie Director" required/>
                </div>
                <div className="submitform" style={{marginTop:"-3.3%",marginLeft:"45%"}}>
                <button type="submit" className="btn btn-dark">Submit</button>
                </div>
                </form>
                {Movies3.map((dir:any)=>{
                return(
                    <MovieThumbnail movie={dir}  key={dir.Did}></MovieThumbnail>
                   
                )
            })}
        </div>
    )
}

interface MovieTumbnailProps {
    movie:any
}

 function MovieThumbnail({movie}:  MovieTumbnailProps): ReactElement {
    return (
       
        <div className="card" style={{display:'inline-block',width:"25%",height:"10%"}}>
        <div className="card-body">
        <div className="titleHolder">
          <h5 className="card-title">{movie.MovieName} </h5>
          </div>
        </div>
      </div>

    )
}
