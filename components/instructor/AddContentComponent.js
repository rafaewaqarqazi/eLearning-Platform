import {Dialog, DialogActions, DialogContent, Grid, Button, Typography, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {DropzoneArea} from "material-ui-dropzone";
import DialogTitleComponent from "../DialogTitleComponent";
import {PlayCircleOutline} from "@material-ui/icons";
import {removeVideo, uploadVideo} from '../../utils/apiCalls/instructor'
import {makeStyles} from "@material-ui/styles";
const useStyles = makeStyles(theme => ({
    video: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        border: '1px solid lightgrey',
        borderRadius: "5px"
    }
}));
const AddContentComponent = ({videos, setVideos, removeVideoFromState}) => {
    const classes = useStyles();
    const [addVideoDialog, setAddVideoDialog] = useState(false);
    const [videoData, setVideoData] = useState({
        title: '',
        description: '',
        video: null
    });
    const [videoDataError, setVideoDataError] = useState({
        title: {
            show: false,
            message: ''
        },
        description: {
            show: false,
            message: ''
        },
        video: {
            show: false,
            message: ''
        }
    });
    const handleDropZone = (files)=>{
        setVideoDataError({...videoDataError, video: {show: false, message: ''}});
        setVideoData({...videoData, video: files[0]})
    };
    const addVideo = () => {
        if (valid()) {
            const formData = new FormData();
            formData.set('video', videoData.video);
            uploadVideo(formData)
                .then(res => {
                    setVideos({
                        title: videoData.title,
                        description: videoData.description,
                        video: res.file
                    });
                    setVideoData({
                        title: '',
                        description: '',
                        video: null
                    })
                    setAddVideoDialog(false);
                })
        }
    };
    const valid = () => {
        if (videoData.title.trim().length < 2 || videoData.title.trim().length > 20) {
            setVideoDataError({...videoDataError,
                title: {
                    show: true,
                    message: 'Title Must be Between 2-20 Characters'
                }
            });
            return false;
        }
        if (videoData.description.trim().length < 20 || videoData.description.trim().length > 500) {
            setVideoDataError({...videoDataError,
                description: {
                    show: true,
                    message: 'Title Must be Between 20-500 Characters'
                }
            });
            return false;
        }
        if (!videoData.video) {
            setVideoDataError({...videoDataError,
                video: {
                    show: true,
                    message: 'Please Add Video'
                }
            });
            return false;
        }
        return true
    }
    const handleChange = event => {
        setVideoDataError({
            ...videoDataError,
            title: {
                show: false,
                message: ''
            },
            description: {
                show: false,
                message: ''
            },
        });
      setVideoData({...videoData, [event.target.name]: event.target.value})
    };
    const onClickRemoveVideo = videoName => {
        removeVideo(videoName)
            .then(res => {
                if (res.success) {
                    removeVideoFromState(videoName)
                }
            })
    }
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '5px'}}>
                <Button variant='outlined' onClick={()=>setAddVideoDialog(true)}>Add Video</Button>
            </div>
            <Grid container spacing={1}>
                {
                    videos.length > 0 ?
                        videos.map((video, index) =>
                            <Grid item xs={6} sm={2} key={index}>
                                <div className={classes.video}>
                                    <PlayCircleOutline fontSize='large'/>
                                </div>
                                <Button color='primary' size='small' fullWidth onClick={()=>onClickRemoveVideo(video.video.filename)}>Remove</Button>
                            </Grid>
                        ) :
                        <Typography variant='subtitle1' color='textSecondary'>No Videos Uploaded Yet</Typography>
                }

            </Grid>
            <Dialog open={addVideoDialog} maxWidth='sm' fullWidth onClose={()=>setAddVideoDialog(false)}>
                <DialogTitleComponent title='Add Video Content' handleClose={()=>setAddVideoDialog(false)}/>
                <DialogContent dividers>
                    <Grid container spacing={1}>
                        <Grid item xs={12} >
                            <TextField
                                variant='outlined'
                                label='Title'
                                fullWidth
                                name='title'
                                placeholder='Video Title here'
                                required
                                error={videoDataError.title.show}
                                helperText={videoDataError.title.show ? videoDataError.title.message : `${videoData.title.length}/20`}
                                value={videoData.title}
                                onChange={handleChange}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                label='Description'
                                fullWidth
                                name='description'
                                placeholder='Description'
                                required
                                error={videoDataError.description.show}
                                helperText={videoDataError.description.show ? videoDataError.description.message : `${videoData.description.length}/500`}
                                value={videoData.description}
                                onChange={handleChange}
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                    {
                        videoDataError.video.show && <Typography variant='caption' color='error'>{videoDataError.video.message}</Typography>
                    }
                    <DropzoneArea
                        onChange={handleDropZone}
                        acceptedFiles={['video/*']}
                        filesLimit={1}
                        maxFileSize={20000000}
                        dropzoneText='Drag and drop Video here or click'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setAddVideoDialog(false)}>Cancel</Button>
                    <Button color='primary' onClick={addVideo}>Add Video</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddContentComponent;