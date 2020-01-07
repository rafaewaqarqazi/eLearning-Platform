import React, {useEffect, useState} from 'react';
import CourseDetailsLayout from "../../components/Layouts/CourseDetailsLayout";
import {fetchAllCourses} from "../../utils/apiCalls/users";
import {Container, Typography} from "@material-ui/core";
import MyCoursesComponent from "../../components/course/MyCoursesComponent";
import {makeStyles} from "@material-ui/styles";
const useStyles = makeStyles(theme => ({
    title: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
}));
const All = () => {
    const classes = useStyles();
    const [courses,setCourses] = useState({
        isLoading: true,
        courses: []
    });
    useEffect(()=> {
        fetchAllCourses()
            .then(courses => {
                if (courses.success) {
                    setCourses({
                        isLoading: false,
                        courses: courses.courses
                    })
                }
            })
            .catch(error => console.log(error.message))
    },[])
    return (
        <CourseDetailsLayout>
            <Container>
                <Typography variant='h5' className={classes.title}>Courses</Typography>
                <MyCoursesComponent courses={courses}/>
            </Container>
        </CourseDetailsLayout>
    );
};

export default All;