import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import {serverUrl} from "../../utils/config";
import router from 'next/router';
import Rating from '@material-ui/lab/Rating';
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

  const handleClickCard = (courseId) => {
    router.push(`/course/[courseId]`, `/course/${courseId}`)
  }
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={()=>handleClickCard(course._id)}>
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Rating name="read-only" value={course.reviews.length} readOnly />
        <Typography variant="caption" color="textSecondary" noWrap>
            ({course.reviews.length})
          </Typography>
      </CardActions>
    </Card>
  );
}
export default CourseCardComponent