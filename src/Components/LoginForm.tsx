import { Button, Grid } from '@material-ui/core';
import {  FormControl, makeStyles, Paper, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { signWithEmailAndPassword } from '../Firebase/LoginFirebase';
import { User } from '../Models/User';


const useStyles = makeStyles({
    root:{
        justifyContent: 'center',
    },
    formDiv:{
        justifyContent: 'center'
    },
    textFiles:{
        width: 250,
        margin: 10,
    },
    button:{
        width: '50%',
        textAlign: 'center',
        margin: 'auto auto 10px auto',
        borderRadius: 5
    }
})


const LoginForm = () => {
    const classes = useStyles();
    const [user, setUser] = useState<User>(new User('', ''));
    const [validation, setValidation] =  useState({
        emailError: '',
        email: false,
        passwordErro: '',
        password: false
    })
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        setValidation({
        emailError: '',
        email: false,
        passwordErro: '',
        password: false
        });
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        });
    }


    const handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) : void => {
        event.preventDefault();
        signWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                console.log(result)
            })
            .catch((err) =>{
                switch(err.code){
                    case 'auth/invalid-email':
                    case 'auth/email-already-exists':
                        setValidation({
                            ...validation,
                            emailError: err.message,
                            email: true
                        });
                        break;
                    case 'auth/wrong-password':
                    case 'auth/invalid-password':
                        setValidation({
                            ...validation,
                            passwordErro: err.message,
                            password: true
                        });
                        break;
                    case 'auth/user-not-found':
                        alert(err.message);
                        break;
                }
            })
    }

    useEffect(() => {
    }, [])
    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
                >
                <Paper className={classes.formDiv}  title='Sign in' elevation={5}>
                    <Grid item xs={3} >
                        <form autoComplete='off'>
                            <FormControl onSubmit={(event) => event.preventDefault()}>
                                <input id="email" style={{display: "none"}} type="email" name="fakeusernameremembered" />
                                <TextField
                                    className={classes.textFiles}
                                    autoFocus 
                                    variant='outlined' 
                                    placeholder='Email Address'
                                    value={user.email} 
                                    name='email'
                                    onChange={handleChangeValue}
                                    error={validation.email}
                                    helperText={validation.emailError}
                                    type='Email'/>
                                <TextField
                                    className={classes.textFiles}
                                    variant='outlined' 
                                    placeholder='Password' 
                                    value={user.password} 
                                    name='password'
                                    onChange={handleChangeValue}
                                    error={validation.password}
                                    helperText={validation.passwordErro}
                                    autoComplete= 'new-password'
                                    type='Password'/>
                                <Button 
                                    className={classes.button}
                                    variant='contained'
                                    onClick={handleLogin} 
                                    color='secondary' >
                                    Sign in
                                </Button>
                            </FormControl>  
                        </form>
                    </Grid>   
                </Paper>
            </Grid>                
        </div>
    )
}

export default LoginForm
