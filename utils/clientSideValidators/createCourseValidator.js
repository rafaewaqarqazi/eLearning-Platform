export const isValid = (state,setTitleError,setSubtitleError, setDescriptionError, setVideoError, setCoverImageError)=>{
    const {title, subtitle, activeStep, description, videos, coverImage} = state;
    let length = 0;
    if (description) {
        description.blocks.map(pd => {
            length += pd.text.trim().length
        });
    }
    if ((title.trim().length < 2 || title.trim().length > 50) && activeStep === 0){
        setTitleError();

       return true;
    }else if ((subtitle.trim().length < 30 || subtitle.trim().length > 150) && activeStep === 0 ){
        setSubtitleError();
        return true;
    }else if ((!coverImage) && activeStep === 0 ){
        setCoverImageError(true);
        return true;
    }else if ((!description || length < 200 || length > 1500) && activeStep === 1) {
        setDescriptionError(length);
        return true
    }
    else if ((videos.length < 3) && activeStep === 2) {
        setVideoError();
        return true
    }

    return false;
};