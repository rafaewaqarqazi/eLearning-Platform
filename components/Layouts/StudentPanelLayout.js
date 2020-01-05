import React, {useState, useContext, useEffect, Fragment} from 'react';

import {
    CssBaseline, Drawer,
    IconButton, List, ListItemText,
    ListItemIcon,
    Avatar, Tooltip,
    Hidden, Toolbar, AppBar
} from '@material-ui/core';
import {ListAlt,
    Dashboard, Assignment
} from '@material-ui/icons';

import ProjectContext from '../../context/project/project-context';
import UserContext from '../../context/user/user-context';
import clsx from "clsx";
import {useDrawerStyles} from "../../src/material-styles/drawerStyles";
import MenuIcon from '@material-ui/icons/Menu';
import Router from 'next/router'
import ProfileMenu from "../profile/ProfileMenu";
import AppBarWithAddMenu from "./AppBarWithAddMenu";
import DrawerLayout from "./DrawerLayout";
import MobileDrawer from "./MobileDrawer";
import DrawerLink from "./DrawerLink";

const StudentPanelLayout = ({children})=> {
    const classes = useDrawerStyles();
    const projectContext = useContext(ProjectContext);
    const userContext = useContext(UserContext);
    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(()=>{
        projectContext.fetchByStudentId();
        userContext.fetchUserById()
    },[]);
    const handleDrawerOpen = ()=> {
        setOpen(true);
    };

    const handleDrawerClose =()=> {
        setOpen(false);
    };

    const handleDrawerToggle = ()=>event=>{
        setMobileOpen(!mobileOpen);
    };
    const drawerContent = (
        <Fragment>
            <List>
                <DrawerLink href={'/'}>
                    <ListItemIcon>
                        <Dashboard className={classes.iconColor}/>
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                </DrawerLink>
                <DrawerLink href={'/student/courses'}>
                    <ListItemIcon>
                        <Assignment className={classes.iconColor}/>
                    </ListItemIcon>
                    <ListItemText primary={"My Courses"} />
                </DrawerLink>
                <DrawerLink href={'/courses/all'}>
                    <ListItemIcon>
                        <ListAlt className={classes.iconColor}/>
                    </ListItemIcon>
                    <ListItemText primary={"Catalog"} />
                </DrawerLink>
            </List>
        </Fragment>
    );
     const handleClickProfile = ()=>{
         Router.push('/student/profile');
     };
    return (
        <div >
            <CssBaseline />
            <div style={{flexGrow:1}}>
                <Hidden smUp>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Hidden smUp>
                                <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu" onClick={handleDrawerToggle()}>
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>
                            <div style={{flexGrow:1}}>
                                <Tooltip title='eLearning Platform' placement='right'>
                                    <Avatar alt="ELP-LOGO" src="/static/avatar/elp-logo.jpg" />
                                </Tooltip>
                            </div>
                            <div className={classes.profile}>
                                <ProfileMenu handleClickProfile={handleClickProfile}/>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <nav >
                        <Hidden smUp >
                            <MobileDrawer
                                mobileOpen={mobileOpen}
                                handleDrawerToggle={handleDrawerToggle}
                                drawerContent={drawerContent}
                                />
                        </Hidden>
                    </nav>
                    <div>
                        {children}
                    </div>
                </Hidden>
            </div>
            <div className={classes.root}>
                <Hidden xsDown>
                    <AppBarWithAddMenu open={open} handleClickProfile={handleClickProfile}/>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                        open={open}
                    >
                        <DrawerLayout
                            open={open}
                            handleDrawerOpen={handleDrawerOpen}
                            handleDrawerClose={handleDrawerClose}
                            drawerContent={drawerContent}
                            />
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        {children}
                    </main>
                </Hidden>
            </div>
        </div>
    );

};

export default StudentPanelLayout;
