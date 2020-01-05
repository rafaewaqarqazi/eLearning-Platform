import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {DropzoneArea} from 'material-ui-dropzone';
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
            activeStep: 2,
            loading:false,
            success:false,
            title:'',
            subtitle:'',
            description: null,
            videos: [],
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
            }
        };
    }
    setVideos = (video) => {
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
            success:false
        });
        router.push('/instructor/courses')
    };

    handleNext = ()=> {
        if (!isValid(this.state,this.setTitleError, this.setSubtitleError, this.setDescriptionError)){
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
    handleSubmit=()=>{
        if (!isValid(this.state,this.setTitleError, this.setSubtitleError)){

            this.setState({
                loading:true
            });
            let mod = [];
            this.state.modules.map((module,i) =>{
                mod[i]=module.label;
            });
            this.formData.set('majorModules',JSON.stringify(mod));

            // this.context.uploadVision(this.formData,this.context.project.project._id)
            //     .then(res=>{
            //         this.setState({
            //             success:true
            //         })
            //     })
            //     .catch(err => console.log(err.message));
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
    handleModuleChange = e => {
        this.setState({
            currentModule:e.target.value,
            modulesError:{
                show:false,
                message:''
            }
        });
    };
    handleSubmitModule = e =>{
        e.preventDefault();
        if (this.state.currentModule.trim() !== ''){
            this.setState({
                modules:[
                    ...this.state.modules,
                    {
                        key:this.state.modules.length+1,
                        label:this.state.currentModule
                    }
                ]
            });
            this.setState({currentModule:''})
        }

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
                        scope={scope}
                        scopeError={scopeError}
                        handleChange={this.handleChange}
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
                    <AddContentComponent videos={this.state.videos} setVideos={this.setVideos} removeVideoFromState={this.removeVideoFromState}/>
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