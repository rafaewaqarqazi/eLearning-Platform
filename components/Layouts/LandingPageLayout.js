import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    CssBaseline,
    Hidden,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar, Container,
    TextField,
    InputAdornment
} from '@material-ui/core';
import {Input, Search} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "next/link";
import UserContext from '../../context/user/user-context';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    list: {
        width: 250,
    },
    button:{
        margin:theme.spacing(1)
    },
    content:{
        marginTop:theme.spacing(3)
    },
    link:{
        textDecoration:'none',
        color:'inherit'
    },
    avatar: {
        margin: 10,
        cursor:'pointer'
    },
    avatarDrawer: {
        width: 100,
        height: 100,
        margin:'auto'
    },
    avatarMargin:{
        margin: theme.spacing(2)
    }
}));

 const LandingPageLayout =  props => {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
     const userContext = useContext(UserContext);
     useEffect(()=>{
         userContext.removeUserState();
     },[]);
     const handleChangeSearch = e =>{
     };

     const drawer = (
        <div className={classes.list}>
            <div className={classes.avatarMargin}>
                <Avatar alt="ELP-LOGO" src='/static/avatar/elp-logo.png' className={classes.avatarDrawer}/>
            </div>
            <Divider />
            <List>
                <Link href='/sign-in'>
                    <ListItem button >
                        <ListItemIcon >
                            <Input />
                        </ListItemIcon>
                        <ListItemText primary={'Login'} />
                    </ListItem>
                </Link>
                <Link href='/sign-up'>
                    <ListItem button >
                        <ListItemIcon >
                            <Input />
                        </ListItemIcon>
                        <ListItemText primary={'Create an Account'} />
                    </ListItem>
                </Link>
            </List>
        </div>
    );
    const handleDrawerToggle = ()=>event=>{
        setOpen(!open);
    };

    return (
        <div>
            <CssBaseline/>
            <div className={classes.root}>
                <AppBar position="fixed" color="default">
                    <Container>
                    <Toolbar>
                        <Hidden smUp>
                            <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu" onClick={handleDrawerToggle()}>
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Link href='/'>
                            <Avatar alt="ELP-LOGO"
                                    src="/static/avatar/elp-logo.png"
                                    className={classes.avatar}
                            />
                        </Link>
                        <Typography variant='h6' color='textSecondary' className={classes.title}>
                            <Link href='/'>
                                <a className={classes.link}>
                                    eLearning Platform
                                </a>
                            </Link>
                        </Typography>
                        <TextField
                            variant="outlined"
                            label="Search"
                            name='search'
                            margin='dense'
                            placeholder='Search For Courses'
                            onChange={handleChangeSearch}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Hidden xsDown >
                            <Link href='/sign-in'>
                                <Button color="primary" className={classes.button}>Login</Button>
                            </Link>
                            <Link href='/sign-up'>
                                <Button color="primary"  className={classes.button}>Sign Up</Button>
                            </Link>
                        </Hidden>
                    </Toolbar>
                    </Container>
                </AppBar>
                <nav >
                    <Hidden smUp >
                        <Drawer
                            variant="temporary"
                            open={open}
                            onClose={handleDrawerToggle()}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <div>
                    <div className={classes.toolbar}/>
                    {props.children}
                </div>

            </div>
        </div>
    );

};

export default LandingPageLayout;