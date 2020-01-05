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