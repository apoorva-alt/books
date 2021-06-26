import React, { useState } from 'react';
import logo from './logo.svg';
import { Button, CardHeader, Input, Card, Tabs, Tab } from '@material-ui/core';
import { signIn, signUp } from '../controller/user'

function Login(props: any) {

    const [username, updateUsername] = useState('')
    const [password, updatePassword] = useState('')
    const [name, updateName] = useState('')
    const [email, updateEmail] = useState('')
    const [tab, updateTab] = useState('signin')

    const onSignIn = () => {
        signIn({ username, password }).then((data:any) => {
            console.log('data', data)
            localStorage.setItem('token', JSON.stringify(data.data.token))
            localStorage.setItem('user', JSON.stringify(data.data.result))
            props.history.push('/notes')
        }).catch(err => alert(err.message))
    }


    const onSignUp = () => {
        signUp({ username, password, email, name }).then(() => {
            alert("Sign up successfull")
        })
    }

    console.log('PPPP', props)

    return (
        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
            <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e) => console.log("val", e.target)}
            >
                <Tab label="Sign In" key="signin" onClick={() => updateTab('signin')} />
                <Tab label="Sign up" key="signup" onClick={() => updateTab('signup')} />
            </Tabs>
            <Card style={{ width: "400px", display: 'flex', justifyContent: 'center', padding: '40px' }}>
                <div>
                    <br />
                    {tab === 'signup' &&
                        <div>
                            <span> name </span>
                            <br />
                            <Input value={name} onChange={e => updateName(e.target.value)} placeholder="username" />
                            <br />
                            <br />
                            <span> email </span>
                            <br />
                            <Input value={email} onChange={e => updateEmail(e.target.value)} placeholder="email" />
                            <br />
                            <br />
                        </div>
                    }
                    <span> username </span>
                    <br />
                    <Input value={username} onChange={e => updateUsername(e.target.value)} placeholder="username" />
                    <br />
                    <br />
                    <span> password </span>
                    <br />
                    <Input type="password" value={password} onChange={e => updatePassword(e.target.value)} placeholder="password" />
                    <br />
                    <br />
                    <Button onClick={tab === 'signin' ? onSignIn : onSignUp}>{tab === 'signin' ? "Sign In" : "Sign Up"}</Button>
                </div>
            </Card>
        </div>

    );
}

export default Login;
