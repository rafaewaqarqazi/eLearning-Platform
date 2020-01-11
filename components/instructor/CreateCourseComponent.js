import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid, LinearProgress,
} from '@material-ui/core';
import SuccessSnackBar from "../snakbars/SuccessSnackBar";
import {isValid} from '../../utils/clientSideValidators/createCourseValidator';
import router from 'next/router';
import OverviewComponent from "./OverviewComponent";
import StepperComponent from "../stepper/StepperComponent";
import MUIRichTextEditor from "mui-rte";
import AddContentComponent from "./AddContentComponent";
import { uploadCourse } from '../../utils/apiCalls/instructor';
const styles = theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    drag:{
        maxHeight:10
    },

});


class CreateCourseComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            loading:false,
            success:false,
            title:'',
            subtitle:'',
            description: null,
            category: 'Development',
            videos: [],
            coverImage:null,
            titleError:{
                show:false,
                message:''
            },
            subtitleError:{
                show:false,
                message:''
            },
            descriptionError:{
                show:false,
                message:''
            },
            videoError:{
                show:false,
                message:''
            },
            coverImageError: {
                show: false,
                message: ''
            }
        };
    }
    setCategory = event => {
        this.setState({category: event.target.value})
    }
    setVideos = (video) => {
        this.setState({
            videoError:{
                show:false,
                message:''
            }
        })
        this.setState({
            videos: [...this.state.videos, video]
        })
    };
    removeVideoFromState = (videoName) => {
        this.setState({
            videos: this.state.videos.filter(video => video.video.filename !== videoName)
        })
    }
    setTitleError=()=>{
        this.setState({
            titleError:{
                show:true,
                message:'Title Must Be between 2-50 Characters'
            }
        })
    };
    setSubtitleError = ()=>{
        this.setState({
            subtitleError:{
                show:true,
                message:'Subtitle Must Be between 30-150 Characters'
            }
        })
    };
    setDescriptionError = length=>{
        this.setState({
            descriptionError:{
                show:true,
                message:`Description must be between 200 - 1500 characters and yours is ${length}`
            }
        })
    };

    componentDidMount() {
        this.formData = new FormData();
    }

    handleSuccess= ()=>{
        this.setState({
            success:false,
            loading: false
        });
        router.push('/instructor/courses')
    };

    handleNext = ()=> {
        if (!isValid(this.state,this.setTitleError, this.setSubtitleError, this.setDescriptionError, this.setVideoError,this.setCoverImageError)){
            this.setState(prevState =>({
                activeStep:prevState.activeStep + 1
            }));
        }
    };

    handleBack = () =>{
        this.setState(prevState =>({
            activeStep:prevState.activeStep - 1
        }));
    };
    setVideoError = () => {
        this.setState({
            videoError:{
                show:true,
                message:`Please Add Atleast 3 videos`
            }
        })
    }
    setCoverImageError = (con) => {
        this.setState({
            coverImageError:{
                show: con,
                message:con ? `Please Add Cover Image` : ''
            }
        })
    }
    setCoverImage = (image) => {
        this.setState({
            coverImage: image
        })
    }
    handleSubmit=()=>{
        if (!isValid(this.state,this.setTitleError, this.setSubtitleError, this.setDescriptionError, this.setVideoError)){

            this.setState({
                loading:true
            });
            console.log('State', this.state)
            const {title, subtitle, description, category, videos} = this.state
            const data = {
                title,
                subtitle,
                description: JSON.stringify(description),
                category,
                content: videos
            }
            const formData = new FormData();
            formData.set('coverImage', this.state.coverImage);
            formData.set('data', JSON.stringify(data))
            uploadCourse(formData)
                .then(res => {
                    if (res.success) {
                        this.setState({
                            success:true
                        });
                    }
                })
        }


    };
    handleDelete = moduleToDelete => () => {
        this.setState({
            modules:this.state.modules.filter(module => module.key !== moduleToDelete.key)
        });
    };
    handleChange = e => {
        this.setState({
            titleError:{
                show:false,
                message:''
            },
            subtitleError:{
                show:false,
                message:''
            },
            descriptionError:{
                show:false,
                message:''
            },
            [e.target.name]: e.target.value
        });
        this.formData.set(e.target.name,e.target.value);
    };
    saveDescription = data => {
        const description = JSON.parse(data);
        this.setState({description})
    };
    onChangeDescription = descState => {
        this.setState({
            descriptionError:{
                show:false,
                message:''
            }
        });
    };
    getStepContent = step => {
        switch (step) {
            case 0:
                const {title,titleError,subtitle,subtitleError,scope,scopeError} = this.state;
                return (
                    <OverviewComponent
                        title={title}
                        titleError={titleError}
                        subtitle={subtitle}
                        subtitleError={subtitleError}
                        coverImageError={this.state.coverImageError}
                        handleChange={this.handleChange}
                        category={this.state.category}
                        setCategory={this.setCategory}
                        setCoverImage={this.setCoverImage}
                        setCoverImageError={this.setCoverImageError}

                    />
                );
            case 1:
                return (
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={10} >
                            {
                                this.state.descriptionError.show && <Typography color='error' variant='caption'>{this.state.descriptionError.message}</Typography>
                            }
                            <MUIRichTextEditor
                                label="Start typing..."
                                onSave={this.saveDescription}
                                onChange={this.onChangeDescription}
                                controls={[ "title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "numberList", "bulletList", "quote", "code", "clear", "save"]}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <div>
                        {
                            this.state.videoError.show && <Typography color='error' variant='caption'>{this.state.videoError.message}</Typography>
                        }
                        <AddContentComponent
                            videos={this.state.videos}
                            setVideos={this.setVideos}
                            removeVideoFromState={this.removeVideoFromState}
                        />
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {this.state.loading && <LinearProgress color='secondary'/>}
                <SuccessSnackBar open={this.state.success} message='Course Created Successfully' handleClose={this.handleSuccess}/>
                <StepperComponent
                    steps={['Overview', 'Description', 'Upload Content']}
                    handleBack={this.handleBack}
                    handleNext={this.handleNext}
                    handleSubmit={this.handleSubmit}
                    getStepContent={this.getStepContent}
                    activeStep={this.state.activeStep}
                />
            </div>
        );
    }

}

export default withStyles(styles)(CreateCourseComponent);