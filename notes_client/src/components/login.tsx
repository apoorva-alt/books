import React, { useState }from 'react';
import logo from './logo.svg';
import { Button, CardHeader, Input, Card } from '@material-ui/core';
import { signIn, signUp} from '../controller/user'

function Login(props: any) {
    
  const [username, updateUsername] = useState('')
  const [password, updatePassword] = useState('')
    const onSubmit = () => {
         if(username && password) {
            if(props.type === 'signin') {
                signIn({username, password}).then(() => {
                    console.log("login successfully")
                })
            } else {
                signUp({username, password}).then(() => {
                    console.log("created successfully")
                })
            }
         }
         else {
            
         }
    }

    const onSignIn = () => {
        signIn({username, password}).then(() => {
            alert("Sign in successfull")
        }).catch(err => alert(err.message))
    }

    
    const onSignUp = () => {
        signUp({username, password}).then(() => {
            alert("Sign up successfull")
        })
    }

    return (
        <Card style={{width:"400px", display:'flex', justifyContent:'center', padding:'40px'}}>
            <div>
                <br />
                <span> username </span>
                <br />
                <Input value={username} onChange={e => updateUsername(e.target.value)} placeholder="username" />
                <br />
                <span> email </span>
                <br />
                <Input value={username} onChange={e => updateUsername(e.target.value)} placeholder="username" />
                <br />
                <br />
                <span> password </span>
                <br />
                <span> password </span>
                <br />
                <Input value={password} onChange={e => updatePassword(e.target.value)} placeholder="password" />
                <br />
                <br />
                <Button onClick={props.type === 'signin' ?  onSignIn :  onSignUp}>{props.type === 'signin' ? "Sign In" : "Sign Up"}</Button>
            </div>
        </Card>

    );
}

export default Login;
