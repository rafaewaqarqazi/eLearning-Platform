import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import UserContext from '../../context/user/user-context';
import Link from "next/link";
import {setWatchVideo} from "../../utils/apiCalls/students";
import {withStudentAuthSync} from "../routers/studentAuth";
import {
  Container,
  Grid,
  List,
  ListItem, ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@material-ui/core";
import {serverUrl} from "../../utils/config";
import {CheckCircleOutline, CheckCircle} from '@material-ui/icons'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
        padding: '5px 0 0 0',
    },
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  textTransform: {
    textTransform: 'capitalize'
  },
  listRoot: {
    width: '100%'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  description: {
    wordBreak: 'break-all'
  },
  watchedColor: {
    color: '#4caf50'
  }
}));

const CourseWatchComponent = ({courseDetails, setCourse,index}) => {
    const userContext = useContext(UserContext);
    const classes = useStyles();
    const [currentIndex,setCurrentIndex] = useState(index)
    const [currentVideo, setCurrentVideo] = useState(`${serverUrl}/../static/video/${courseDetails.content[index].video.filename}`);
    useEffect(()=> {
      setCurrentIndex(index)
      if (courseDetails.content[index].watchedBy) {
        const watched = courseDetails.content[index].watchedBy.filter(user => user === userContext.user.user._id)
        if (watched.length === 0) {
          const data = {
            courseId: courseDetails._id,
            contentId: courseDetails.content[index]._id,
            userId: userContext.user.user._id
          }
          setWatchVideo(data)
            .then(res => {
              setTimeout(()=> {
                setCourse()
              }, 5000)
            })
            .catch(error => console.log(error.message))
        }
      }
      setTimeout(()=>{
        setCurrentVideo(null)
      },500)
      setTimeout(()=> {
        setCurrentVideo(`${serverUrl}/../static/video/${courseDetails.content[index].video.filename}`)
      },1000)
    },[index]);
    return (
      <div>
          <Grid container >
              <Grid item xs={12} sm={9}>
                <iframe src={currentVideo} width='100%' height='400px' />
              </Grid>
              <Grid item xs={12} sm={3}>
                <List className={classes.listRoot} disablePadding>
                  {
                    courseDetails.content.map((content, i) =>
                      <Link href={'/student/courses/[courseId]/[index]'} as={`/student/courses/${courseDetails._id}/${i}`} key={i}>
                        <ListItem
                          button
                          className={classes.nested}
                          selected={currentIndex == i}
                        >
                          <ListItemIcon>
                            {
                              content.watchedBy.filter(user => user === userContext.user.user._id).length > 0 ?
                                <CheckCircle className={classes.watchedColor}/> :
                                <CheckCircleOutline className={classes.watchedColor}/>
                            }
                          </ListItemIcon>
                          <ListItemText primary={content.title} className={classes.textTransform}/>
                          <ListItemSecondaryAction>{content.video.duration || 0}</ListItemSecondaryAction>
                        </ListItem>
                      </Link>
                    )
                  }
                </List>
              </Grid>
              <Grid item xs={12}>
                  <Container>
                    <Typography variant='h5' className={`${classes.title} ${classes.textTransform}`}>{courseDetails.content[currentIndex].title}</Typography>
                    <Typography variant='body1' className={classes.description}>{courseDetails.content[currentIndex].description}</Typography>
                  </Container>
              </Grid>

          </Grid>
      </div>

    );
}
export default withStudentAuthSync(CourseWatchComponent)