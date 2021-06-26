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
        // console.log(questions);
    })

    useEffect(() => console.log(userInfo), [userInfo])
    const List = () => {
        return (
            <div className="">
                <h1 className="index-title">Top Questions <Link className="btn btn-primary" style={{ float: "right" }} to="/create">Ask question</Link></h1>
                {questions?.map(question => {
                    if (question?.likes.includes(userInfo._id)) {
                        return (
                            <div key={question._id} className="panel box1">
                                <Link className="topnav-brand1" to={`/question/${question._id}`}>
                                    <h3>{question.title}</h3>
                                    <p className="color-adjust">Asked {moment(question?.createdAt).fromNow()} by {question?.asker?.name}</p>
                                </Link>
                            </div>
                        )
                    }
                })}
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