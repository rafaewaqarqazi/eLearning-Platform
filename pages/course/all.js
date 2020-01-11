import React, {useEffect, useState} from 'react';
import CourseDetailsLayout from "../../components/Layouts/CourseDetailsLayout";
import {fetchAllCourses} from "../../utils/apiCalls/users";
import {Container, Typography} from "@material-ui/core";
import MyCoursesComponent from "../../components/course/MyCoursesComponent";
import {makeStyles} from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Search} from "@material-ui/icons";
const useStyles = makeStyles(theme => ({
    title: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    formControl: {
        minWidth: 160,
        marginRight:theme.spacing(0.2)
    },
    search: {
        paddingBottom: theme.spacing(1.2),
        display:'flex',
        flexDirection: 'column',

        [theme.breakpoints.up('sm')]: {
            paddingBottom: theme.spacing(1.2),
            display:'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }
    }
}));
const All = () => {
    const classes = useStyles();
    const [courses,setCourses] = useState({
        isLoading: true,
        courses: []
    });
    const [category, setCategory] = useState('All');
    const [filter,setFilter] = useState({
        isLoading: true,
        courses: []
    });
    useEffect(()=> {
        fetchAllCourses()
            .then(courses => {
                if (courses.success) {
                    setCourses({
                        isLoading: false,
                        courses: courses.courses
                    })
                    setFilter({
                        isLoading: false,
                        courses: courses.courses
                    })
                }
            })
            .catch(error => console.log(error.message))
    },[])
    const handleChange =(event)=> {
        setCategory(event.target.value);
        let data = [];
        switch (event.target.value) {
            case 'All':
                setFilter(courses);
                break;
            case event.target.value :
                courses.courses.map(course => {
                    if (course.category === event.target.value){
                        data = [...data, course]
                    }
                });
                setFilter({...filter, courses: data});
                break;
        }
    };
    const handleChangeSearch = e =>{
        const data = courses.courses;
        setFilter({...filter, courses: e.target.value !==''? data.filter(course => course.title.toLowerCase().includes(e.target.value.toLowerCase())) : courses.courses})
    };
    return (
        <CourseDetailsLayout>
            <Container>
                <Typography variant='h5' className={classes.title}>Courses</Typography>
                <div className={classes.search}>
                    <FormControl variant="outlined" margin='dense' className={classes.formControl}>
                        <InputLabel htmlFor="category">
                            Category
                        </InputLabel>
                        <Select
                          value={category}
                          onChange={handleChange}
                          input={<OutlinedInput labelWidth={65} name="category" id="category" />}
                        >
                            <MenuItem value='All'>All</MenuItem>
                            <MenuItem value='Development'>Development</MenuItem>
                            <MenuItem value='Artificial Intelligence'>Artificial Intelligence</MenuItem>
                            <MenuItem value='Design'>Design</MenuItem>
                            <MenuItem value='Life Style'>Life Style</MenuItem>
                        </Select>
                    </FormControl>
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
                </div>
                <MyCoursesComponent courses={filter}/>
            </Container>
        </CourseDetailsLayout>
    );
};

export default All;