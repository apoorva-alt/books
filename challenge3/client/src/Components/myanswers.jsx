import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import getUserByToken from '../Lib/getUserByToken';
import { Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [firstRender, setFirstRender] = useState(true);
    const [Answers, setAnswers] = useState(null);
    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(result => {
            if (result) setUserInfo(result)
            if (firstRender) setFirstRender(false)
        })
    }, [firstRender])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/get/answers`)
            .then(res => setAnswers(res.data))
    })
    useEffect(() => console.log(userInfo), [userInfo])

    const List = () => {
        return (
            <div className="">
                <h1 className="index-title">My Answers <Link className="btn btn-primary" style={{ float: "right" }} to="/create">Ask question</Link></h1>
                {Answers?.map(answer => {
                    if (answer?.answerer._id == userInfo._id && answer.answer.length > 0) {
                        return (
                            <div className="panel box1">
                                <Link className="topnav-brand1" to={`/question/${answer.quesId}`}>
                                    <h2 style={{ color: "wheat" }}>Answer :</h2>
                                    <h3 style={{ color: "wheat" }}>{answer.answer}</h3>
                                </Link>
                            </div>
                        )}
                    })
                }
            </div>
        )
    }

    return (<div>{List()}</div>)
}
export default Home;