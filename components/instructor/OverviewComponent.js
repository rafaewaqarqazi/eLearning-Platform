import React from 'react';
import {Grid, TextField, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles'
import {DropzoneArea} from "material-ui-dropzone";
const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(3),
    },
  }));
const OverviewComponent = ({titleError,title,handleChange,subtitle,subtitleError, coverImageError, category, setCategory, setCoverImage, setCoverImageError}) => {
    const classes = useStyles();
    const handleDropZone = (files)=>{
        setCoverImageError(false);
        setCoverImage(files[0])
    };
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={10} md={8}>
                <TextField
                    variant='outlined'
                    label='Title'
                    fullWidth
                    name='title'
                    placeholder='Course Title here'
                    required
                    error={titleError.show}
                    helperText={titleError.show ? titleError.message : `${title.length}/50`}
                    value={title}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={10} md={8}>
                <TextField
                    variant='outlined'
                    label='Sub Title'
                    fullWidth
                    name='subtitle'
                    placeholder='Sub Title of Course'
                    required
                    error={subtitleError.show}
                    helperText={subtitleError.show ? subtitleError.message : `${subtitle.length}/150`}
                    value={subtitle}
                    onChange={handleChange}
                    multiline
                    rows={2}
                />
            </Grid>
            <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Category</FormLabel>
                <RadioGroup aria-label="category" name="category" value={category} onChange={setCategory} row>
                    <FormControlLabel value="Development" control={<Radio />} label="Development" />
                    <FormControlLabel value="Artificial Intelligence" control={<Radio />} label="Artificial Intelligence" />
                    <FormControlLabel value="Design" control={<Radio />} label="Design" />
                    <FormControlLabel value="Life Style" control={<Radio />} label="Life Style" />
                </RadioGroup>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={10} md={8}>
                {
                    coverImageError.show && <Typography variant='caption' color='error'>{coverImageError.message}</Typography>
                }
                <DropzoneArea
                    onChange={handleDropZone}
                    acceptedFiles={['image/*']}
                    filesLimit={1}
                    maxFileSize={5000000}
                    dropzoneText='Drag and drop Cover Image here or click'
                />
            </Grid>
        </Grid>
    );
};

export default OverviewComponent;