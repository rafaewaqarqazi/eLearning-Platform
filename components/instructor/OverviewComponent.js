import React from 'react';
import {Grid, TextField} from "@material-ui/core";

const OverviewComponent = ({titleError,title,handleChange,subtitle,subtitleError}) => {

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
        </Grid>
    );
};

export default OverviewComponent;