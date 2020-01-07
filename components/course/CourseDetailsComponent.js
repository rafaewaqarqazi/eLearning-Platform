import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/styles';
import {Grid, Container, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Hidden} from '@material-ui/core'
import moment from 'moment'
import Rating from '@material-ui/lab/Rating';
import MUIRichTextEditor from "mui-rte";
import {serverUrl} from "../../utils/config";
import UserContext from '../../context/user/user-context';
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

const CourseDetailsComponent = ({courseDetails}) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  console.log('TCL: CourseDetailsComponent -> courseDetails', courseDetails)
  return (
      <div>
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
                                        !userContext.user.isLoading && userContext.user.user.role !== 'Instructor' &&
                                        <CardActions>
                                            <Button variant='contained' color='secondary' fullWidth>Enroll Now</Button>
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