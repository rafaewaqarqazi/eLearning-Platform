import {useRouter} from "next/router";

import React, {useState, useEffect} from 'react';
import {getCourse} from '../../../utils/apiCalls/users'
import StudentPanelLayout from '../../../components/Layouts/StudentPanelLayout'
import CourseWatchComponent from '../../../components/course/CourseWatchComponent'
import {LinearProgress} from '@material-ui/core'
const CourseWatchDetails = ({id}) => {
    const [course, setCourse] = useState({
        isLoading: true,
        course: {}
    })
    const router = useRouter();
    
    
    useEffect(()=> {
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
    },[])
    const resetCourse = (uCourse) => {
        setCourse({
            ...course,
            course: uCourse
        })
    }
    return (
        <div style={{backgroundColor: '#fff'}}>
            <StudentPanelLayout>
                {
                    course.isLoading ? <LinearProgress/> :
                    <CourseWatchComponent courseDetails={course.course} setCourse={resetCourse}/>
                }
            </StudentPanelLayout>
        </div>
    );
};

CourseWatchDetails.getInitialProps = context => {

    const {courseId} = context.query
    
    return {id:courseId};
  };

export default CourseWatchDetails;