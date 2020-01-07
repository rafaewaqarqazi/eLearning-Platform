import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {Grid, Container, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Hidden} from '@material-ui/core'
import moment from 'moment'
import Rating from '@material-ui/lab/Rating';
import MUIRichTextEditor from "mui-rte";
import {serverUrl} from "../../utils/config";
import UserContext from '../../context/user/user-context';
import Link from "next/link";
import {enrollInCourse, leaveCourse} from "../../utils/apiCalls/students";
import SuccessSnackBar from "../snakbars/SuccessSnackBar";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
        padding: '5px 0 0 0',
    },
  },
  header: {
      backgroundColor: '#505763'
  },
  title: {
    fontWeight:600,
    fontSize:'36px',
    color: '#fff'
  },
  whiteColor: {
    color: '#fff'
  },
  row: {
    display: 'flex',
    alignItems: 'center'
  },
  rightMargin: {
    marginRight: theme.spacing(2)
  },
  leftMargin: {
    marginLeft: theme.spacing(1)
  },
  card: {
    maxWidth: 345,
    marginBottom: '-70%'
  },
  media: {
    height: 180,
  }
}));

const CourseDetailsComponent = ({courseDetails, setCourse}) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [success,setSuccess] = useState(false)
  console.log('TCL: CourseDetailsComponent -> courseDetails', courseDetails)
    const handleClickEnroll = (studentId, courseId) => {
      enrollInCourse({studentId,courseId})
          .then(res => {
              if (res.success){
                  setSuccess(true)
                  setCourse(res.course)
              }
          })
          .catch(error => console.log(error.message))
    }
    const handleClickLeaveCourse = (studentId, courseId) => {
        leaveCourse({studentId,courseId})
            .then(res => {
                if (res.success){
                    setSuccess(true)
                    setCourse(res.course)
                }
            })
            .catch(error => console.log(error.message))
    }
  return (
      <div>
          <SuccessSnackBar message={'Success'} open={success} handleClose={()=>setSuccess(false)}/>
        <Hidden xsDown >
            <div className={classes.header}>
                <Container >
                    <Grid container spacing={3} className={classes.root}>
                        <Grid item xs={12} sm={8}>
                            <Typography variant='h5' className={classes.title}>{courseDetails.title}</Typography>
                            <Typography variant='h5' className={classes.whiteColor}>{courseDetails.subtitle}</Typography>
                            <div className={classes.row}>
                                <Rating name="read-only" value={courseDetails.reviews.length} readOnly />
                                <Typography variant='subtitle1' className={`${classes.whiteColor} ${classes.rightMargin} ${classes.leftMargin}`}>{`(${courseDetails.reviews.length} ratings)`}</Typography>
                                <Typography variant='subtitle1' className={classes.whiteColor}>{`${courseDetails.students.length} students enrolled`}</Typography>
                            </div>
                            <div className={classes.row}>
                                <Typography variant='body1' className={`${classes.whiteColor} ${classes.rightMargin}`}>{`Created by ${courseDetails.createdBy.name}`}</Typography>
                                <Typography variant='body1' className={classes.whiteColor}>{`Last Updated ${moment(courseDetails.createdAt).format('DD/MM/YY')}`}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Hidden xsDown >
                                <Card className={classes.card}>
                                    <CardActionArea >
                                        <CardMedia
                                        className={classes.media}
                                        image={`${serverUrl}/../static/images/${courseDetails.coverImage.filename}`}
                                        title={courseDetails.coverImage.originalname}
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" noWrap>
                                            {courseDetails.title}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary" noWrap>
                                            {courseDetails.createdBy.name}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    {
                                        !userContext.user.isLoading && userContext.user.user.role === 'Instructor' && userContext.user.user._id === courseDetails.createdBy._id  &&
                                        <CardActions>
                                            <Button color='primary' fullWidth>Remove Course</Button>
                                        </CardActions>
                                    }
                                    {
                                        userContext.user.isLoading ?
                                        <CardActions>
                                            <Link href='/sign-in'>
                                                <Button variant='contained' color='secondary' fullWidth>Enroll Now</Button>
                                            </Link>
                                        </CardActions>
                                        : userContext.user.user.role === 'Student' &&
                                        courseDetails.students.filter(student => student === userContext.user.user._id).length === 0 ?
                                        <CardActions>
                                            <Button variant='contained' color='secondary' onClick={()=>handleClickEnroll(userContext.user.user._id, courseDetails._id)} fullWidth>Enroll Now</Button>
                                        </CardActions>
                                            : <CardActions>
                                                <Button variant='contained' color='secondary' onClick={()=>handleClickLeaveCourse(userContext.user.user._id, courseDetails._id)} fullWidth>Leave Course</Button>
                                            </CardActions>
                                    }
                                </Card>
                            </Hidden>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Hidden>
        <div>
            <Container >
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12}>
                        <Hidden smUp >
                            <Card >
                                <CardActionArea >
                                    <CardMedia
                                    className={classes.media}
                                    image={`${serverUrl}/../static/images/${courseDetails.coverImage.filename}`}
                                    title={courseDetails.coverImage.originalname}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" noWrap>
                                            {courseDetails.title}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            {courseDetails.subtitle}
                                        </Typography>
                                        <div className={classes.row}>
                                            <Rating name="read-only" value={courseDetails.reviews.length} readOnly />
                                            <Typography variant='subtitle1' className={classes.leftMargin}>{`(${courseDetails.reviews.length} ratings)`}</Typography>
                                        </div>
                                        <Typography variant='subtitle1' >{`${courseDetails.students.length} students`}</Typography>
                                        <Typography variant='body1' className={classes.rightMargin}>{`Created by ${courseDetails.createdBy.name}`}</Typography>
                                        <Typography variant='body1' >{`Last Updated ${moment(courseDetails.createdAt).format('DD/MM/YY')}`}</Typography>
                                    </CardContent>
                                </CardActionArea>
                                {
                                    !userContext.user.isLoading && userContext.user.user.role !== 'Instructor' &&
                                    <CardActions>
                                        <Button variant='contained' color='secondary' fullWidth>Enroll Now</Button>
                                    </CardActions>
                                }
                            </Card>
                        </Hidden>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <MUIRichTextEditor
                            controls={[]}
                            readOnly={true}
                            value={courseDetails.description}
                        />
                    </Grid>
                    
                </Grid>
            </Container>
        </div>
      </div>
   
  );
}
export default CourseDetailsComponent