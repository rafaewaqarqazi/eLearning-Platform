import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CircularLoading from '../loading/CircularLoading';
import CourseCardComponent from './CourseCardComponent';
import {Grid} from '@material-ui/core'
const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const MyCoursesComponent = ({courses}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {
          courses.isLoading ? <CircularLoading /> :
            courses.courses.map((course, index) =>
                <Grid item xs={12} sm={4} md={3} key={index}>
                    <CourseCardComponent course={course}/>
                </Grid>
            )
      }
    </Grid>
  );
}
export default MyCoursesComponent