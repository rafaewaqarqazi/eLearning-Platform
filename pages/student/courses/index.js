import React, {useEffect, useState} from 'react';
import StudentPanelLayout from "../../../components/Layouts/StudentPanelLayout";
import {withStudentAuthSync} from "../../../components/routers/studentAuth";
import {Container, Typography} from "@material-ui/core";
import MyCoursesComponent from "../../../components/course/MyCoursesComponent";
import {getStudentCourses} from "../../../utils/apiCalls/students";
import {makeStyles} from "@material-ui/styles";
const useStyles = makeStyles(theme => ({
    title: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
}));
const Index = () => {
    const classes = useStyles();
    const [courses, setCourses] = useState({
        isLoading: true,
        courses: []
    });
    useEffect(()=> {
        getStudentCourses()
            .then(myCourses => {
                setCourses({isLoading: false, courses: myCourses.courses})
            })
    },[])
    return (
        <StudentPanelLayout>
            <Container>
                <Typography variant='h5' className={classes.title}>My Courses</Typography>
                <MyCoursesComponent courses={courses}/>
            </Container>
        </StudentPanelLayout>
    );
};

export default withStudentAuthSync(Index);