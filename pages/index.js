import {Container, Grid, Typography, Button,Avatar} from '@material-ui/core';
import LandingPageLayout from "../components/Layouts/LandingPageLayout";
import {withLandingAuthSync} from "../components/routers/landingAuth";
import {makeStyles} from "@material-ui/styles";
import CopyrightComponent from "../components/CopyrightComponent";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from "react";
import Link from 'next/link';
import {serverUrl} from "../utils/config";
const useStyles = makeStyles(theme => ({
    textContainer:{
        marginTop:theme.spacing(4),
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',

    },
    mainTitle:{
        marginBottom:theme.spacing(2),
        fontWeight:500,
        fontSize:'2.75rem'
    },
    textRightContainer:{
        marginLeft:theme.spacing(0),
        padding:theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            padding:theme.spacing(2),
            marginLeft:theme.spacing(10),
        },
    },
    image:{
        maxWidth:'95%',
        padding:theme.spacing(2)
    },
    firstHeadingContainer:{
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(5)
    },
    margin:{
        marginTop:theme.spacing(10),
        marginBottom:theme.spacing(10)
    },

    developerDetails:{
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        textAlign:'center'
    },
    avatar:{
        width:150,
        height:150,
        marginBottom:theme.spacing(2)
    },
    developerHeading:{
        textAlign:'center',
        marginBottom:theme.spacing(5)
    },

}));
const Index = () => {
    const landingClasses = useStyles();
    useEffect(()=>{
        if (AOS.refresh() === undefined){
            AOS.init({
                offset: 200,
                duration: 600,
                easing: 'ease-in-sine',
                delay: 100,
            });
        }
    },[])
    return (
        <LandingPageLayout>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} className={landingClasses.textContainer} >
                        <div className={landingClasses.textRightContainer}>
                            <Typography variant='h5' color='textPrimary' className={landingClasses.mainTitle}>
                                Learn anything you want, anywhere
                            </Typography>
                            <Link href='/sign-up'>
                                <Button variant='contained' color='primary'>Start Now</Button>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={7}  className={landingClasses.textContainer}>
                        <img src='/static/avatar/frontImage1.png' alt='eLearning Platform' className={landingClasses.image}/>
                    </Grid>
                </Grid>
                <CopyrightComponent/>
            </Container>
        </LandingPageLayout>
    );
};


export default withLandingAuthSync(Index);