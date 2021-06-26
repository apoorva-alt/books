import React, { useEffect, useState } from "react";
import Axios from "axios";
import ReactMarkdown from 'react-markdown';
import moment from "moment";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";
import { Link } from "react-router-dom";

const Question = (params) => {
    const [question, setQuestion] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [firstRender, setFirstRender] = useState(true);
    const [inputAnswer, setInputAnswer] = useState('');

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(result => {
            if(result) setUserInfo(result)
            if(firstRender) setFirstRender(false)
        })
    }, [firstRender])

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/get/${params.match.params.questionId}`)        
        .then(res => {
            if(res.data) setQuestion(res.data)
        })
        .catch(() => window.location = "/")
    }, [params.match.params.questionId])

    const postAnswer = e => {
        e.preventDefault();
        const token = new Cookies().get('token')
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/questions/answer`, {token, answer: inputAnswer, answerer: userInfo.email, question: question._id})
        .then(res => {
            console.log(res.data)
            Axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/get/${params.match.params.questionId}`)        
            .then(res => {
                if(res.data) setQuestion(res.data)
            })
            .catch(() => window.location = "/")
            setInputAnswer('')
        })
    }
    const likepost = (id) => {
        console.log('clicked', id);
        Axios.put(`${process.env.REACT_APP_SERVER_URL}/questions/like`, { quesId: id, userId: userInfo?._id })
            .then(res => {
                console.log(res);
            })
    }

    const dislikepost = (id) => {
        console.log('clicked', id);
        Axios.put(`${process.env.REACT_APP_SERVER_URL}/questions/dislike`, { quesId: id, userId: userInfo?._id })
            .then(res => {
               // console.log(res);
            })
    }

    return(
        <div className="container panel">
            <h1 className="question-title">{question?.title}</h1>
            <p>Asked {moment(question?.createdAt).fromNow()}</p>
            <hr />
            <blockquote className="question-body">
                <ReactMarkdown>{question?.body}</ReactMarkdown>
            </blockquote>
            {question?.answers.map(answer => {
                return <div className="my-2" key = {answer.answer}>
                <hr />
                <h1 className="question-title">{answer.answerer.name} answered:</h1>
                <blockquote className="question-body">
                    <ReactMarkdown>{answer.answer}</ReactMarkdown>
                </blockquote>
                        {/* <div style={{ marginLeft: "80%" }}>
                                            <span >
                                                <button className="votes" disabled={question.likes.includes(userInfo._id)} onClick={() => { likeanswer(question?._id) }}> <i className="glyphicon glyphicon-thumbs-up icon" ></i>
                                                </button>
                                                <button className="votes" disabled={!question.likes.includes(userInfo._id)} onClick={() => { dislikeanswer(question?._id) }}>
                                                    <i className="glyphicon glyphicon-thumbs-down icon"></i></button>
                                            </span>
                        </div> */}
                </div>
            })}
            <hr />
            {userInfo && !firstRender?
            <form className="my-5" onSubmit = {postAnswer}>
                <h1 className="question-title">Your Answer</h1>
                <textarea rows="8" className="form-control" placeholder = "Your answer!!!" value ={inputAnswer} 
                onChange = {({target: {value}}) => setInputAnswer(value)}></textarea>
                <input type="submit" value="Post Your Answer" className="form-control btn blue-background white-text btn btn-primary login" />
            </form>
            :<p><Link to = "/login">Login</Link> to post your answer.</p>}
        </div>
    )
}

export default Question