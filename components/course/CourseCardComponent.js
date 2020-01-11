import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/styles';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    LinearProgress
} from '@material-ui/core';
import {serverUrl} from "../../utils/config";
import router from 'next/router';
import Rating from '@material-ui/lab/Rating';
import UserContext from "../../context/user/user-context";
import {getCourseRatings} from "../../utils";

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 160,
    },
});

const CourseCardComponent = ({course}) => {
    console.log('TCL: CourseCardComponent -> course', course)
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const handleClickCard = (courseId) => {
        router.push(`/course/[courseId]`, `/course/${courseId}`)
    }
    const getProgress = (content) => {
        let watchedCount = 0;
        content.map(c => {
            watchedCount += c.watchedBy.filter(user => user === userContext.user.user._id).length
        })
        return ((watchedCount / content.length) * 100).toFixed(0)
    }
    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => handleClickCard(course._id)}>
                <CardMedia
                    className={classes.media}
                    image={`${serverUrl}/../static/images/${course.coverImage.filename}`}
                    title={course.coverImage.originalname}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" noWrap>
                        {course.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" noWrap>
                        {course.createdBy.name}
                    </Typography>
                    {
                        userContext.user && userContext.user.user.role === 'Student' && router.router.pathname === '/student/courses' &&
                        <div>
                            <LinearProgress variant='determinate' color='secondary' value={getProgress(course.content)}
                            style={{borderRadius: 10}}/>
                            <Typography variant="caption" style={{display: 'flex', justifyContent: 'flex-end'}}
                            color="textSecondary">
                            {getProgress(course.content)}%
                            </Typography>
                        </div>
                    }
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Rating name="read-only" value={getCourseRatings(course.reviews)} readOnly/>
                <Typography variant="caption" color="textSecondary" noWrap>
                    ({getCourseRatings(course.reviews)})
                </Typography>
            </CardActions>
        </Card>
    );
}
export default CourseCardComponent