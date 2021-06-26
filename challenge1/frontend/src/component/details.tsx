import React, { ReactElement, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';




interface Props {
    dataTosearch:any
}

export default function Ttable({dataTosearch}: Props): ReactElement {
    console.log(window.location.href);
    const params = useParams<any>();
    let [movie, setMovie] = useState([]); 
     useEffect( () => {
         (async ()=>{
            await axios.get("http://localhost:4000/director/"+params.id)
            .then((res:any)=> {
                let a = res.data;
                res.data = [];
                res.data.push(a);
                console.log(res);
                setMovie(res.data);
            })
            .catch((err)=>console.log(err.message))
         })()
    },[])
        return (
        <div> 
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
       
        <div style={{width:'100%',padding:"100px"}}>
        <img  className="card-img-top" src={movie.imageUrl} alt="Card image cap" style={{width:"31%",margin :"0% 0% 5%",height:"800px"}} />
        <div className="titleHolder" style={{color:"wheat", marginLeft:"-9%"}}>
          <h5 className="card-title" style={{color:"wheat"}}>{movie.Director_name} </h5>
          </div>
          <p style={{color:"wheat"}}>Age : {movie.age}</p>
      <p style={{color:"wheat"}}>{movie.description}</p>
          </div>
    )
}

 