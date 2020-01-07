import {useRouter} from "next/router";

import React, {useState, useEffect} from 'react';
import {getCourse} from '../../utils/apiCalls/users'
import CourseDetailsLayout from '../../components/Layouts/CourseDetailsLayout'
import CourseDetailsComponent from '../../components/course/CourseDetailsComponent'
import {LinearProgress} from '@material-ui/core'
const CourseDetails = ({id}) => {
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
            <CourseDetailsLayout>
                {
                    course.isLoading ? <LinearProgress/> :
                    <CourseDetailsComponent courseDetails={course.course} setCourse={resetCourse}/>
                }
            </CourseDetailsLayout>
        </div>
    );
};

CourseDetails.getInitialProps = context => {

    const {courseId} = context.query
    
    return {id:courseId};
  };

export default CourseDetails;