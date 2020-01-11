import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CircularLoading from '../loading/CircularLoading';
import CourseCardComponent from './CourseCardComponent';
import {Grid} from '@material-ui/core'
import Typography from "@material-ui/core/Typography";
import {useListItemStyles} from "../../src/material-styles/listItemStyles";
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
  const emptyClasses = useListItemStyles();
  return (
    <Grid container spacing={2}>
      {
          courses.isLoading ? <CircularLoading /> :
            courses.courses.length > 0 ? courses.courses.map((course, index) =>
                <Grid item xs={12} sm={4} md={3} key={index}>
                    <CourseCardComponent course={course}/>
                </Grid>
            )
              :<div className={emptyClasses.emptyListContainer}>
                <div className={emptyClasses.emptyList}>
                  <Typography variant='subtitle2' color='textSecondary'>
                    No Courses Found
                  </Typography>
                </div>
              </div>
      }
    </Grid>
  );
}
export default MyCoursesComponent