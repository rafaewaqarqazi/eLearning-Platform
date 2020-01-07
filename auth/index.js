import fetch from 'isomorphic-unfetch';
import {serverUrl} from "../utils/config";
import cookie from 'js-cookie';
import Router from 'next/router';
import nextCookie from 'next-cookies';

export const signup = user =>{
    return  fetch(`${serverUrl}/auth/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signin = user =>{
    return  fetch(`${serverUrl}/auth/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const authenticate = (data)=>{
    cookie.set('token',data,{expires: 7});
    Router.push('/sign-in');
};

export const signout = ()=>{
    cookie.remove('token');
   Router.push('/sign-in')
};

export const isAuthenticated =()=>{
    const data= cookie.get('token');
    if (data){
        return JSON.parse(data)
    }
    else {
        return false;
    }
};

export const isEligible =async (token)=>{
   return await fetch(`${serverUrl}/auth/isEligible`,{
        method:"GET",
        headers:{
            Accept: "application/json",
            Authorization:`Bearer ${token}`
        }
    });
};

export const verifyEmail = data =>{
    return  fetch(`${serverUrl}/auth/verify-email`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const studentAuth = ctx => {
    const { token } = nextCookie(ctx);
    const user =token ? JSON.parse(token) : {user:{role:''}};

    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }
    else if (ctx.req && token && user.user.role !== 'Student'){
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }
    else if (ctx.req && token && !user.user.isEmailVerified) {
        ctx.res.writeHead(302, { Location: `/verify-email/${user.user._id}` });
        ctx.res.end();
        return
    }

    if (!token){
        Router.push('/sign-in')
    }
    else if (token &&  user.user.role !== 'Student') {
        Router.push('/sign-in')
    } else if (!user.user.isEmailVerified && typeof window !== 'undefined'){
        Router.push(`/verify-email/[id]`, `/verify-email/${user.user._id}`)
    }
    return token



};
export const ugpcMemberAuth = (ctx, position,committeeType) =>{
    const { token } = nextCookie(ctx);
    const user =token ? JSON.parse(token) : {user:{role:'',additionalRole:'',ugpc_details: {position: '',committeeType: ''}}};
    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }
    else if (ctx.req && token && user.user.additionalRole !== 'UGPC_Member' ){
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }
    else if (ctx.req && token && user.user.additionalRole === 'UGPC_Member' && user.user.ugpc_details.position !== position ){
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }else if (ctx.req && token && user.user.additionalRole === 'UGPC_Member' && user.user.ugpc_details.position === position && user.user.ugpc_details.committeeType !== committeeType ){
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }

    if (!token){
        Router.push('/sign-in')
    }
    else if (token &&  user.user.additionalRole !== 'UGPC_Member') {
        Router.push('/sign-in')
    }
    else if (token && user.user.additionalRole === 'UGPC_Member' && user.user.ugpc_details.position !== position){
        Router.push('/sign-in')
    }
    else if (token && user.user.additionalRole === 'UGPC_Member' && user.user.ugpc_details.position === position && user.user.ugpc_details.committeeType !== committeeType){
        console.log(committeeType)
        Router.push('/sign-in')
    }
    return token
};
export const instructorAuth = ctx => {
    const { token } = nextCookie(ctx);
    const user =token ? JSON.parse(token) : {user:{role:''}};

    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }
    else if (ctx.req && token && user.user.role !== 'Instructor'){
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }else if (ctx.req && token && !user.user.isEmailVerified) {
        ctx.res.writeHead(302, { Location: `/verify-email/${user.user._id}` });
        ctx.res.end();
        return
    }

    if (!token){
        Router.push('/sign-in')
    }
    else if (token &&  user.user.role !== 'Instructor') {
        Router.push('/sign-in')
    } else if (!user.user.isEmailVerified && typeof window !== 'undefined'){
        Router.push(`/verify-email/[id]`, `/verify-email/${user.user._id}`)
    }
    return token
};

export const chairmanAuth = ctx => {
    const { token } = nextCookie(ctx);
    const user =token ? JSON.parse(token) : {user:{role:''}};

    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }
    else if (ctx.req && token && user.user.role !== 'Chairman DCSSE'){
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }

    if (!token){
        Router.push('/sign-in')
    }
    else if (token &&  user.user.role !== 'Chairman DCSSE') {
        Router.push('/sign-in')
    }
    return token
};
export const officeAuth = (ctx,role) => {
    const { token } = nextCookie(ctx);
    const user =token ? JSON.parse(token) : {user:{role:''}};

    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }
    else if (ctx.req && token && user.user.role !== role){
        ctx.res.writeHead(302, { Location: '/sign-in' });
        ctx.res.end();
        return
    }

    if (!token){
        Router.push('/sign-in')
    }
    else if (token &&  user.user.role !== role) {
        Router.push('/sign-in')
    }
    return token
};

export const landingAuth = ctx => {
    const { token } = nextCookie(ctx);
    const user =token ? JSON.parse(token) : {user:{role:'',additionalRole: '',ugpc_details:{position:'',committeeType:''}}};
    if (ctx.req && token && user.user.role === 'Student') {
        ctx.res.writeHead(302, { Location: '/student/courses' });
        ctx.res.end();
        return
    }
    else if (ctx.req && token && user.user.role === 'Instructor') {
        ctx.res.writeHead(302, { Location: '/instructor/courses' });
        ctx.res.end();
        return
    }


    //Client Side
    if (token && user.user.role === 'Student') {
        Router.push('/student/courses')
    }
    else if (token && user.user.role === 'Instructor') {
        Router.push('/instructor/courses')
    }
    return token
};

//
export const forgotPassword = async email => {
    console.log("email: ", email);
    const res = await fetch(`${serverUrl}/auth/forgot-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });
    return await res.json();
};

export const resetPassword = async resetInfo => {
    const res = await fetch(`${serverUrl}/auth/reset-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    });
    return await res.json();
};