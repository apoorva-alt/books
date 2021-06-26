import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import getUserByToken from '../Lib/getUserByToken';
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from "moment";

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [firstRender, setFirstRender] = useState(true);
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(result => {
            if (result) setUserInfo(result)
            if (firstRender) setFirstRender(false)
        })
    }, [firstRender])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/get/all`)
            .then(res => setQuestions(res.data))
    })

    const likepost = (id) => {
        console.log('clicked', id);
        axios.put(`${process.env.REACT_APP_SERVER_URL}/questions/like`, { quesId: id, userId: userInfo?._id })
            .then(res => {
                console.log(res);
            })
    }

    const dislikepost = (id) => {
        console.log('clicked', id);
        axios.put(`${process.env.REACT_APP_SERVER_URL}/questions/dislike`, { quesId: id, userId: userInfo?._id })
            .then(res => {
               // console.log(res);
            })
    }

    const List = () => {
        return (
            <div className="container panel">
                {!userInfo && !firstRender ?
                    <div className="mt-5 intro-pg pt-5">
                        <h1 className="intro-title"></h1>
                        <p className="mt-3 intro-text"></p>
                        <Link to="/login" className="btn btn-dark mr-2">Log in</Link>
                        <Link to="/register" className="btn btn-light ml-2">Sign up</Link>
                    </div>
                    : <div className="">
                        <h1 className="index-title">Top Questions <Link className="btn btn-primary" style={{ float: "right" }} to="/create">Ask question</Link></h1>
                        {questions?.map(question => {
                            return (
                                <div key={question._id} className="panel box1">

                                    <Link className="topnav-brand1" to={`/question/${question._id}`}>
                                        <h3>{question.title}</h3>
                                        <p className="color-adjust">Asked {moment(question?.createdAt).fromNow()} by {question?.asker?.name}</p>
                                    </Link>
                                    <div style={{ marginLeft: "80%" }}>
                                        <span >
                                            <button className="votes" disabled={question.likes.includes(userInfo._id) && !question.dislikes.includes(userInfo._id) } onClick={() => { likepost(question?._id) }}> <i className="glyphicon glyphicon-thumbs-up icon" ></i>
                                            </button>
                                            <button className="votes" disabled={question.dislikes.includes(userInfo._id) && !question.likes.includes(userInfo._id)} onClick={() => { dislikepost(question?._id) }}>
                                                <i className="glyphicon glyphicon-thumbs-down icon"></i></button>
                                        </span>
                                    </div>
                                    <div style={{ marginLeft: "85%", marginTop: "15px" }}>
                                        <span style={{ color: "wheat", fontSize: "14", marginRight: "40px" }}>{question?.likes.length} Likes</span>
                                        <span style={{ color: "wheat", fontSize: "14" }}>{question?.dislikes.length} dislikes</span>
                                    </div>

                                </div>
                            )
                        })}
                    </div>}
            </div>
        )
    }

    return (
        <div>
            <div>
                {List()}
            </div>
        </div>
    )
}
export default Home;