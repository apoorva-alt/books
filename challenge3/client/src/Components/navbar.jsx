import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

//import { Form, FormControl, Button } from 'react-bootstrap';

const Navbar = () => {
    const [isShown, setIsShown] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [image, setImage] = useState("");
    let imgSrc ="";
    const name = userInfo ? userInfo.name : "";
    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(res => {
            if(res){
                if(res.status) window.location = "/login";
                else setUserInfo(res)
            }
        })
        
    })
   const uploadpic = ()=>{
       let image1;
     const reader = new FileReader();
     reader.onload = () =>{
         if(reader.readyState ===2 ){
            image1 = reader.result;
         }
     }
     console.log(image1);
     image1 = reader.readAsDataURL(image);
     console.log(image1);
    //  reader.readAsDataURL(e)
    // axios.put(`${process.env.REACT_APP_SERVER_URL}/user/uploadpic`,{url : image, userId : userInfo?._id})
    // .then(res => {likedata(res['data']);
    //             console.log(res);  
//    })
   }
   
    return(
        <div>
        <nav className="navbar navbar-expand-sm bg-dark justify-content-center">
            <Link className="topnav-brand" to= "/">Ask me!</Link>
            <span className="topnav-hamburger-menu" data-target = "myTopnav">&#x2630;</span>
            <div className="topnav-right" id="myTopnav">
            {userInfo?
            <>
             <ul className='nav navbar-nav' style={{marginLeft:'90%'}}> 
                  {userInfo.url ?<img /> :<li className="li1"> <div className="profile"
                     onMouseEnter={() => setIsShown(true)}
                     onMouseLeave={() => setIsShown(false)}
                     ><span className="pname">{name.charAt(0).toUpperCase()}</span></div>
                    </li>
                    }  
                    {/* <li>
                        <input style={{marginLeft:"0%" ,width:"100px",height:"20px",zIndex:10 }} type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                        <button onClick={()=> uploadpic()} style={{marginTop:"1%" ,width:"70px",height:"20px",zIndex:10 }}>Upload</button>
                        </li> */}
            </ul>
            </>:<>
                <ul className='nav navbar-nav' style={{marginLeft:'80%'}}> 
                    <li> <Link className="topnav-brand" to="/login">Login</Link></li>
                    <li><Link className="topnav-brand" to="/register">Sign up</Link></li>
                    
                </ul>
               
            </>}
            </div>
        </nav>
        {isShown && (
        <div>
        <div className="dropdown1" onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
            <i class="glyphicon glyphicon-play" style={{position:"absolute", marginLeft:"91%", transform: "rotate(-90deg)",marginTop:"-4.5%", color:"rgb(248, 180, 226)"}}></i>
            <a href="/create">Add Question</a>
            <a href="/myques">My Questions</a>
            <a href="/myanswer">My Answers</a>
            <a href="/myupvotedquestions">My Upvoted Questions</a>
            {/* <a href="#">My Upvoted Answers</a>   */}
            <a href="/logout">Logout</a>
        </div>
        </div>
      )}
            


        </div>

    )
}

export default Navbar;