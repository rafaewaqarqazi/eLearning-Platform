import React, {useEffect, useState} from 'react';
import {
    Avatar, Box, Button, Grid, TextField, Typography,
    OutlinedInput, InputLabel, MenuItem, FormControl, Select,
    LinearProgress, Container, Tooltip
} from "@material-ui/core";
import Link from "next/link";
import {useSignInStyles} from "../src/material-styles/signin-styles";
import CopyrightComponent from "./CopyrightComponent";
import {signup} from "../auth";
import router from 'next/router';
import SuccessSnackBar from "./snakbars/SuccessSnackBar";
import ErrorSnackBar from "./snakbars/ErrorSnackBar";
import {fetchBatchesAPI} from "../utils/apiCalls/users";

const SignUpComponent = () => {
    const classes = useSignInStyles();
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        role: '',
    });
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState({
        open:false,
        message:''
    });
    const [formErrors,setFormErrors] = useState({
        name:{
            show:false,
            message:''
        },
        email:{
            show:false,
            message:''
        },
        password:{
            show:false,
            message:''
        },
        role: {
            show:false,
            message:''
        },
    });
    const [resMessage,setResMessage] = useState({
        open:false,
        message:'',
        id:''
    });
    const handleChange = event =>{
        setFormErrors({
            name:{
                show:false,
                message:''
            },
            email:{
                show:false,
                message:''
            },
            password:{
                show:false,
                message:''
            },
            role: {
                show:false,
                message:''
            },
        });
        setValues({...values,[event.target.name]:event.target.value})
    };
    const isValid = () =>{
        if (values.name.trim().length === 0 ){
            setFormErrors({
                ...formErrors,
                name:{
                    show:true,
                    message:'Name Should not be Empty'
                }
            });
            return false;
        }else if (!values.email.trim().length === 0 ){
            setFormErrors({
                ...formErrors,
                email:{
                    show:true,
                    message:'Please Provided your email address'
                }
            });
            return false;
        }else if (values.password.length < 8){
            setFormErrors({
                ...formErrors,
                password:{
                    show:true,
                    message:'Password Should have min 8 characters'
                }
            });
            return false;
        }else if (!values.password.match(/\d/)){
            setFormErrors({
                ...formErrors,
                password:{
                    show:true,
                    message:'Password Should include at-least one number'
                }
            });
            return false;
        }else if (values.role === ''){
            setFormErrors({
                ...formErrors,
                batch:{
                    show:true,
                    message:'Required!'
                }
            });
            return false;
        }
        return true;
    };
    const handleSubmit = e => {
        e.preventDefault();
        if(isValid()){
            setLoading(true);
            const user = {
                name:values.name,
                email:values.email.toLowerCase(),
                password:values.password,
                role:values.role
            };
            signup(user)
                .then(data => {
                    setLoading(false);
                    if (data.error){
                        setError({open:true,message:data.error})
                    }else{
                        setResMessage({open:true,message:data.message,id:data._id})
                    }
                })
                .catch(err => {console.log(err)})
        }

    };

    const handleSuccess = ()=>{
        setResMessage({...resMessage,open:false, message:''});
        router.push(`/verify-email/[id]`, `/verify-email/${resMessage.id}`)
    };
    const handleError = ()=>{
        setError({open:false,message:''})
    };
    return (
        <div >
            {loading && <LinearProgress color='secondary'/>}
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar alt="ELP-LOGO" src="/static/avatar/elp-logo.png" className={classes.avatar}/>

                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                </div>
                <div className={classes.root}>
                    <SuccessSnackBar open={resMessage.open} message={resMessage.message} handleClose={handleSuccess}/>
                    <ErrorSnackBar message={error.message} open={error.open} handleSnackBar={handleError}/>
                </div>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} >
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                value={values.name}
                                onChange={handleChange}
                                label="Full Name"
                                autoFocus
                                error={formErrors.name.show}
                                helperText={formErrors.name.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                value={values.email}
                                onChange={handleChange}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"

                                error={formErrors.email.show}
                                helperText={formErrors.email.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={values.password}
                                onChange={handleChange}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                error={formErrors.password.show}
                                helperText={formErrors.password.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={formErrors.role.show} variant="outlined" className={classes.formControl}>
                                <InputLabel  htmlFor="role">
                                   Sign Up As
                                </InputLabel>
                                <Select
                                    value={values.role}
                                    onChange={handleChange}
                                    fullWidth
                                    input={<OutlinedInput  labelWidth={85} fullWidth name="role" id="role" required/>}
                                >
                                    <MenuItem value='Student'>Student</MenuItem>
                                    <MenuItem value='Instructor'>Instructor</MenuItem>
                                </Select>
                                <Typography variant='caption' color='error'>{formErrors.role.message}</Typography>
                            </FormControl>
                        </Grid>

                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/sign-in">
                                <a>Already have an account? Sign in</a>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Box mt={5}>
                    <CopyrightComponent />
                </Box>
            </Container>
        </div>
    );
};

export default SignUpComponent;