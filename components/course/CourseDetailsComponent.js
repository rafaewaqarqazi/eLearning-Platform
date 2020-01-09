import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemSecondaryAction, LinearProgress,
    Dialog,
    DialogContent,
    IconButton,
    AppBar,
    Toolbar
} from '@material-ui/core'
import moment from 'moment'
import {Close, ExpandLess, ExpandMore, GetAppOutlined} from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import MUIRichTextEditor from "mui-rte";
import {serverUrl} from "../../utils/config";
import UserContext from '../../context/user/user-context';
import Link from "next/link";
import {enrollInCourse, leaveCourse} from "../../utils/apiCalls/students";
import {removeCourse} from '../../utils/apiCalls/instructor'
import SuccessSnackBar from "../snakbars/SuccessSnackBar";
import router  from 'next/router'
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import Certificate from "../certificate/Certificate";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  },
  listRoot: {
    width: '100%'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

const CourseDetailsComponent = ({courseDetails, setCourse}) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [success,setSuccess] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [certificateViewer,setCertificateViewer] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
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
    const handleRemoveCourse = courseId => {
        removeCourse(courseId)
        .then(res => {
            if (res.success){
                setSuccess(true)
                router.push('/instructor/courses')
            }
        })
        .catch(error => console.log(error.message))
    }
  const getProgress = (content) => {
    let watchedCount = 0;
    content.map(c => {
      watchedCount += c.watchedBy.filter(user => user === userContext.user.user._id).length
    })
    return ((watchedCount / content.length) * 100).toFixed(0)
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
                                          {
                                            userContext.user.user.role === 'Student' &&
                                            courseDetails.students.filter(student => student === userContext.user.user._id).length === 1 &&
                                            <div>
                                              <LinearProgress variant='determinate' color='secondary' value={getProgress(courseDetails.content)} style={{height:8,borderRadius:10}}/>
                                              <Typography variant="caption" style={{display: 'flex', justifyContent: 'flex-end'}} color="textSecondary">
                                                {getProgress(courseDetails.content)}%
                                              </Typography>
                                                {
                                                    getProgress(courseDetails.content) == 100 &&
                                                        <div>
                                                            <PDFDownloadLink
                                                                document={
                                                                    <Certificate
                                                                        instructorName={courseDetails.createdBy.name}
                                                                        courseTitle={courseDetails.title}
                                                                        studentName={userContext.user.user.name}
                                                                    />
                                                                }

                                                                fileName={`${courseDetails.title}-Certificate`}
                                                                style={{textDecoration:'none'}}
                                                            >
                                                                {
                                                                    ({loading}) =>
                                                                        (loading ? <CircularProgress/> :  <Button variant='outlined' color='primary' fullWidth startIcon={<GetAppOutlined/>}>Get Certificate</Button>)
                                                                }
                                                            </PDFDownloadLink>
                                                            <Button onClick={()=>setCertificateViewer(true)} style={{marginTop: '5px'}} variant='outlined' color='primary' fullWidth>View Certificate</Button>
                                                        </div>
                                                }
                                            </div>
                                          }
                                        </CardContent>

                                    </CardActionArea>
                                    {
                                        !userContext.user.isLoading && userContext.user.user.role === 'Instructor' && userContext.user.user._id === courseDetails.createdBy._id  &&
                                        <CardActions>
                                            <Button color='primary' fullWidth onClick={()=>handleRemoveCourse(courseDetails._id)}>Remove Course</Button>
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
                                            : userContext.user.user.role === 'Student' && <CardActions>
                                                <Button variant='outlined' color='primary' onClick={()=>handleClickLeaveCourse(userContext.user.user._id, courseDetails._id)} fullWidth>Leave Course</Button>
                                                <Link href={`/student/courses/[courseId]/[index]`} as={`/student/courses/${courseDetails._id}/0`}>
                                                    <Button variant='contained' color='secondary' fullWidth>Go to Course</Button>
                                                </Link>
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
                                      {
                                        userContext.user.user.role === 'Student' &&
                                        courseDetails.students.filter(student => student === userContext.user.user._id).length === 1 &&
                                        <div>
                                          <LinearProgress variant='determinate' color='secondary' value={getProgress(courseDetails.content)} style={{height:8,borderRadius:10}}/>
                                          <Typography variant="caption" style={{display: 'flex', justifyContent: 'flex-end'}} color="textSecondary">
                                            {getProgress(courseDetails.content)}%
                                          </Typography>
                                            {
                                                getProgress(courseDetails.content) == 100 &&
                                                <div>
                                                    <PDFDownloadLink
                                                        document={
                                                            <Certificate
                                                                instructorName={courseDetails.createdBy.name}
                                                                courseTitle={courseDetails.title}
                                                                studentName={userContext.user.user.name}
                                                            />
                                                        }
                                                        style={{textDecoration:'none'}}
                                                    >
                                                        {
                                                            ({loading}) =>
                                                                (loading ? <CircularProgress/> :  <Button variant='outlined' color='primary' fullWidth startIcon={<GetAppOutlined/>}>Get Certificate</Button>)
                                                        }
                                                    </PDFDownloadLink>
                                                    <Button onClick={()=>setCertificateViewer(true)} variant='outlined' color='primary' style={{marginTop: '5px'}} fullWidth>View Certificate</Button>
                                                </div>
                                            }
                                        </div>
                                      }
                                    </CardContent>
                                </CardActionArea>
                                {
                                    !userContext.user.isLoading && userContext.user.user.role === 'Instructor' && userContext.user.user._id === courseDetails.createdBy._id  &&
                                    <CardActions>
                                        <Button color='primary' fullWidth onClick={()=>handleRemoveCourse(courseDetails._id)}>Remove Course</Button>
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
                                        : userContext.user.user.role === 'Student' && <CardActions>
                                            <Button variant='outlined' color='primary' onClick={()=>handleClickLeaveCourse(userContext.user.user._id, courseDetails._id)} fullWidth>Leave Course</Button>
                                            <Link href={`/student/courses/[courseId]/[index]`} as={`/student/courses/${courseDetails._id}/0`}>
                                                <Button variant='contained' color='secondary' fullWidth>Go to Course</Button>
                                            </Link>
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
                        <List className={classes.listRoot}>
                            <ListItem button onClick={handleClick}>
                                <ListItemText primary="Video Content" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        courseDetails.content.map((content, index) =>
                                            <ListItem button className={classes.nested} key={index}>
                                                <ListItemText primary={content.title} />
                                                <ListItemSecondaryAction>{content.video.duration || 0}</ListItemSecondaryAction>
                                            </ListItem>
                                        )
                                    }
                                </List>
                            </Collapse>
                            </List>
                    </Grid>
                    
                </Grid>
            </Container>
        </div>
          <Dialog open={certificateViewer} onClose={()=>setCertificateViewer(false)} fullScreen>
              <AppBar className={classes.appBar}>
                  <Toolbar>
                      <Typography variant="h6" style={{flexGrow: 1}} noWrap>
                          Auto Generated Certificate
                      </Typography>
                      <IconButton edge="start" color="inherit" onClick={()=>setCertificateViewer(false)} aria-label="close">
                          <Close />
                      </IconButton>
                  </Toolbar>
              </AppBar>
              <DialogContent style={{height:500}}>
                  <PDFViewer style={{width:'100%',height:'100%'}}>
                      <Certificate
                          instructorName={courseDetails.createdBy.name}
                          courseTitle={courseDetails.title}
                          studentName={userContext.user.user.name}
                      />
                  </PDFViewer>
              </DialogContent>
          </Dialog>
      </div>
   
  );
}
export default CourseDetailsComponent