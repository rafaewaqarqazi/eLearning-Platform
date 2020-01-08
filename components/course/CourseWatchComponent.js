import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Container,
    Typography,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Hidden,
    List,
    ListItem,
    ListItemText,
    Collapse,
    ListItemSecondaryAction
} from '@material-ui/core'
import moment from 'moment'
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import MUIRichTextEditor from "mui-rte";
import {serverUrl} from "../../utils/config";
import UserContext from '../../context/user/user-context';
import Link from "next/link";
import {enrollInCourse, leaveCourse} from "../../utils/apiCalls/students";
import {removeCourse} from '../../utils/apiCalls/instructor'
import SuccessSnackBar from "../snakbars/SuccessSnackBar";
import router  from 'next/router'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
        padding: '5px 0 0 0',
    },
  },
  header: {
      backgroundColor: '#505763'
  },
  title: {
    fontWeight:600,
    fontSize:'36px',
    color: '#fff'
  },
  whiteColor: {
    color: '#fff'
  },
  row: {
    display: 'flex',
    alignItems: 'center'
  },
  rightMargin: {
    marginRight: theme.spacing(2)
  },
  leftMargin: {
    marginLeft: theme.spacing(1)
  },
  card: {
    maxWidth: 345,
    marginBottom: '-70%'
  },
  media: {
    height: 180,
  },
  listRoot: {
    width: '100%'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

const CourseWatchComponent = ({courseDetails, setCourse}) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [success,setSuccess] = useState(false)
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
      <div>
          <SuccessSnackBar message={'Success'} open={success} handleClose={()=>setSuccess(false)}/>
      </div>
   
  );
}
export default CourseWatchComponent