import {
    Collapse,
    Container,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import React, {Fragment, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import UserAvatarComponent from "../UserAvatarComponent";
import moment from "moment";
import {useDocDetailsDialogStyles} from "../../src/material-styles/docDetailsDialogStyles";
import Rating from "@material-ui/lab/Rating";
const useStyles = makeStyles(theme => ({
    commentList:{
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    }
}));
export const RenderReviews = ({comments: reviews})=>{
    const classes = useStyles();
    const classes1 = useDocDetailsDialogStyles();
    const [showReviews,setShowReviews] = useState(true);
    const handleShowComments = e =>{
        setShowReviews(!showReviews);
    };
    return (
        <List>
            <ListItem button onClick={handleShowComments}>
                <ListItemText primary="Show Reviews" />
                {showReviews ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={showReviews} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.commentList}>
                    {
                        !reviews || reviews.length === 0 ?
                            <ListItem>
                                <Typography variant='h5' color='textSecondary'>No Reviews Yet</Typography>
                            </ListItem>
                            :
                            <Container>
                                {
                                    reviews.sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt)).map((review, index)=>(
                                        <Fragment key={index}>
                                            <ListItem alignItems="flex-start" >
                                                <ListItemAvatar>
                                                    <UserAvatarComponent user={review.reviewedBy}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                variant="subtitle2"
                                                                color="textPrimary"
                                                            >
                                                                {review.reviewedBy.name}
                                                            </Typography>
                                                            <Typography  component="span" variant='caption' color='textSecondary'>
                                                                {` - ${moment(review.createdAt).format('MMM D, YYYY')}`}
                                                            </Typography>
                                                            <div>
                                                                <Rating name="read-only" value={review.ratings} readOnly/>
                                                            </div>

                                                        </React.Fragment>
                                                    }
                                                    secondary={
                                                        <Typography
                                                            component="div"
                                                            variant="body2"
                                                            color="textSecondary"
                                                            className={classes1.wrapText}
                                                        >
                                                            {review.text}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </Fragment>
                                    ))
                                }
                            </Container>
                    }
                </List>
            </Collapse>
        </List>
    )
}