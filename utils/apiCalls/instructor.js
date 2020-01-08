import fetch from "isomorphic-unfetch";
import {serverUrl} from "../config";
import {isAuthenticated} from "../../auth";

export const uploadVideo = async data =>{
    const res = await fetch(`${serverUrl}/instructor/upload/video/video`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${isAuthenticated().token}`
        },
        body:data
    });
    return await res.json();
};
export const getInstructorCourses = async () => {
    const res = await fetch(`${serverUrl}/instructor/courses/${isAuthenticated().user._id}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json',
            Authorization:`Bearer ${isAuthenticated().token}`
        }
    });
    return await res.json();
}
export const uploadCourse = async data => {
    const res = await fetch(`${serverUrl}/instructor/course/images/${isAuthenticated().user._id}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${isAuthenticated().token}`
        },
        body:data
    });
    return await res.json();
}
export const removeVideo = async videoName => {
    console.log(videoName)
    const res = await fetch(`${serverUrl}/instructor/remove/${videoName}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${isAuthenticated().token}`
        }
    });
    return await res.json();
}
export const removeCourse = async courseId => {
    const res = await fetch(`${serverUrl}/instructor/remove/course/${courseId}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${isAuthenticated().token}`
        }
    });
    return await res.json();
}