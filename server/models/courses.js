const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const projectsSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    },
    category: String,
    coverImage:{},
    createdBy: {type:ObjectId, ref:"Users"},
    content: [{
        title: String,
        description: String,
        watchedBy:[{type:ObjectId, ref:"Users"}],
        video: {}
    }],
    reviews: [{
        reviewedBy: {type:ObjectId, ref:"Users"},
        text: String,
        ratings: String,
        createdAt: Date
    }],
    students:[{type:ObjectId, ref:"Users"}]
});


module.exports = mongoose.model('Courses',  projectsSchema);