import React, {useContext} from 'react';
import {serverUrl} from "../../utils/config";
import {Avatar, Divider, Drawer} from "@material-ui/core";
import UserContext from "../../context/user/user-context";
import {useDrawerStyles} from "../../src/material-styles/drawerStyles";

const MobileDrawer = ({drawerContent,mobileOpen,handleDrawerToggle}) => {
    const userContext = useContext(UserContext);
    const classes = useDrawerStyles();
    return (
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle()}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}

        >
            <div  style={{width:250,height:'100%'}}>
                <div className={classes.sideBarImage} style={{backgroundImage:`url("${serverUrl}/../static/avatar/sidebar.jpg")`}}>
                    <div className={classes.list}>
                        <div className={classes.avatarDrawer}>
                            {
                                userContext.user.isLoading ?
                                    <Avatar className={`${classes.profileAvatarColor} ${classes.avatarSize}`}>
                                        U
                                    </Avatar>
                                    :
                                    userContext.user.user.profileImage.filename ?
                                        <Avatar className={classes.avatarSize} src={`${serverUrl}/../static/images/${userContext.user.user.profileImage.filename }`}  />
                                        :
                                        <Avatar className={`${classes.profileAvatarColor} ${classes.avatarSize}`}>
                                            { userContext.user.user.name.charAt(0).toUpperCase()}
                                        </Avatar>
                            }
                        </div>
                        <Divider/>
                        {drawerContent}
                    </div>
                </div>
            </div>

        </Drawer>
    );
};

export default MobileDrawer;