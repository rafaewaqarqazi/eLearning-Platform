import {useRouter} from "next/router";

import React, {useState, useEffect} from 'react';
import {getCourse} from '../../../../utils/apiCalls/users'
import StudentPanelLayout from '../../../../components/Layouts/StudentPanelLayout'
import CourseWatchComponent from '../../../../components/course/CourseWatchComponent'
import {LinearProgress} from '@material-ui/core'
import {makeStyles} from "@material-ui/styles";
const useStyles = makeStyles(theme => ({
    root: {
        paddingBottom: theme.spacing(10),
        backgroundColor: '#fff'
    }
}))
const CourseWatchDetails = ({id, i}) => {
    const classes = useStyles();
    const [course, setCourse] = useState({
        isLoading: true,
        course: {}
    })
    const router = useRouter();
    const {index} = router.query

    useEffect(()=> {
        resetCourse()
    },[])
    const resetCourse = () => {
        const {courseId} = router.query;
        console.log('TCL: CourseDetails -> courseId', courseId || id)
        getCourse(courseId || id)
          .then(course => {
              if(course.success) {
                  setCourse({
                      isLoading: false,
                      course: course.course
                  })
              }
          })
          .catch(error => {
              console.log(error.message)
          })
    }
    return (
        <div className={classes.root}>
            <StudentPanelLayout>
                {
                    course.isLoading ? <LinearProgress/> :
                        <CourseWatchComponent courseDetails={course.course} index={index || i} setCourse={resetCourse}/>
                }
            </StudentPanelLayout>
        </div>
    );
};

CourseWatchDetails.getInitialProps = context => {

    const {courseId, index} = context.query

    return {id:courseId, i:index};
};

export default CourseWatchDetails;