import React, { ReactElement, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { getNodeMajorVersion } from 'typescript';




interface Props {
    dataTosearch:any
}

export default function Table({dataTosearch}: Props): ReactElement {
    let [movie, setMovie] = useState([]); 
     useEffect( () => {
         (async ()=>{
            await axios.get("http://localhost:4000/movies")
            .then((res:any)=> {
                setMovie(res.data);
            })
            .catch((err)=>console.log(err.message))
         })()
    },[])
        return (
        <div className="card-deck"> 
            {movie.map((dir:any)=>{
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
       
        <div className="card" style={{display:'inline-block'}}>
        <div className="card-body">
        <img  className="card-img-top" src={movie.imageUrl} alt="Card image cap"/>
        <div className="titleHolder">
          <h5 className="card-title">{movie.Director_name} </h5>
          </div>
        </div>
        <Link to={`/movies/${movie._id}`}><button className="button" >Details</button></Link>
        <Link to={`/moviedetails/${movie._id}`}> <button  className="button" style={{backgroundColor:"rgb(61, 81, 138)", marginLeft:"0px"}}> Movies</button></Link>
      </div>

    )
}
