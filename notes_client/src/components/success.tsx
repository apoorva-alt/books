import React, { useState } from 'react';
import logo from './logo.svg';
import { Card } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

function Result(props: any) {
    return (
        <div>
            {
                props.loginSuccess && (
                    <Card style={{ width: "400px", display: 'flex', justifyContent: 'center', padding: '40px' }}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            This is a success alert — <strong>check it out!</strong>
                        </Alert>
                    </Card>
                )
            }
            {
                props.loginFaliure && (
                    <Card style={{ width: "400px", display: 'flex', justifyContent: 'center', padding: '40px' }}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                             Sign up failure
                        </Alert>
                    </Card>
                )
            }
            {
                props.signUpSuccess && (
                    <Card style={{ width: "400px", display: 'flex', justifyContent: 'center', padding: '40px' }}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Sign up successfully
                        </Alert>
                    </Card>
                )
            }
        </div>


    );
}

export default Result;
