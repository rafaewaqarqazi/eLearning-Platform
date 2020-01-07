import InstructorLayout from "../../../components/Layouts/InstructorLayout";
import {withInstructorAuthSync} from "../../../components/routers/instructorAuth";
import MyCoursesComponent from '../../../components/course/MyCoursesComponent';
import {Container, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import {useEffect, useState} from 'react'
import {getInstructorCourses} from '../../../utils/apiCalls/instructor'
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
        getInstructorCourses()
            .then(myCourses => {
                setCourses({isLoading: false, courses: myCourses.courses})
            })
    },[])
    return (
        <InstructorLayout>
            <Container>
                <Typography variant='h5' className={classes.title}>My Courses</Typography>
                <MyCoursesComponent courses={courses}/>
            </Container>
        </InstructorLayout>
    );
};

export default withInstructorAuthSync(Index);