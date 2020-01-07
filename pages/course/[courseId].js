import {useRouter} from "next/router";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    LinearProgress
} from "@material-ui/core";
import React, {useState, useEffect} from 'react';
import {getCourse} from '../../utils/apiCalls/users'
const CourseDetails = () => {
    const [course, setCourse] = useState({
        isLoading: false,
        course: {}
    })
    const router = useRouter();
    const {courseId} = router.query;
    console.log('TCL: CourseDetails -> courseId', courseId)
    useEffect(()=> {
        getCourse(courseId)
    },[])
    return (
        <div >
            <Container>
            sfdsdf
            </Container>

        </div>
    );
};



export default CourseDetails;