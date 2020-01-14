import React, {Fragment, useContext, useEffect, useState} from 'react';
import clsx from 'clsx';

import {
    Drawer,
    List,
    CssBaseline,
    Divider,
    IconButton,
    ListItemText,
    ListItemIcon,
    Tooltip,
    MenuItem,
    Avatar,
    Typography, Hidden, AppBar, Toolbar, InputLabel, Select, OutlinedInput, FormControl
} from '@material-ui/core';

import Link from "next/link";
import {
    Dashboard,
    SupervisorAccountOutlined,
    SupervisorAccount,
    Visibility,
    Assignment,
    Schedule
} from "@material-ui/icons";
import {useDrawerStyles} from "../../src/material-styles/drawerStyles";
import UserContext from '../../context/user/user-context';
import MenuIcon from '@material-ui/icons/Menu';
import Router from "next/router";
import ProfileMenu from "../profile/ProfileMenu";
import AppBarWithAddMenu from "./AppBarWithAddMenu";
import AddMenu from "./AddMenu";
import DrawerLayout from "./DrawerLayout";
import DrawerLink from "./DrawerLink";
import {useSwitchStyles} from "../../src/material-styles/selectSwitchStyles";
import MobileDrawer from "./MobileDrawer";

const InstructorLayout = ({children})=> {
    const userContext = useContext(UserContext);
    useEffect(()=>{userContext.fetchUserById()},[]);
    const classes = useDrawerStyles();
    const switchClasses = useSwitchStyles();
    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
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
                {/*<DrawerLink href={'/'}>*/}
                {/*    <ListItemIcon>*/}
                {/*        <Dashboard className={classes.iconColor}/>*/}
                {/*    </ListItemIcon>*/}
                {/*    <ListItemText primary={"Home"} />*/}
                {/*</DrawerLink>*/}
                <DrawerLink href={'/instructor/courses'}>
                    <ListItemIcon>
                        <SupervisorAccount className={classes.iconColor}/>
                    </ListItemIcon>
                    <ListItemText primary={"My Courses"} />
                </DrawerLink>
            </List>
        </Fragment>

    );
    const handleAddPresentationClick = ()=>{
        Router.push('/instructor/courses/new');
    };
    const addMenuContent = (
            <MenuItem onClick={handleAddPresentationClick}>
                <ListItemIcon>
                    <SupervisorAccountOutlined />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                    New Course
                </Typography>
            </MenuItem>
    );

    const handleClickProfile = ()=>{
        Router.push('/instructor/profile');
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
                                <Tooltip title='eLearing Platform' placement='right'>
                                    <Avatar alt="ELP-LOGO" src="/static/avatar/elp-logo.png" />
                                </Tooltip>
                            </div>
                            <AddMenu addMenuContent={addMenuContent}/>
                            <ProfileMenu handleClickProfile={handleClickProfile}/>
                        </Toolbar>
                    </AppBar>
                    <nav  aria-label="mailbox folders">
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp >
                            <MobileDrawer
                                drawerContent={drawerContent}
                                mobileOpen={mobileOpen}
                                handleDrawerToggle={handleDrawerToggle}
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
                    <AppBarWithAddMenu open={open} addMenuContent={addMenuContent} handleClickProfile={handleClickProfile}/>
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
export default InstructorLayout;