const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const projectsSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    requirements: String,
    description: String,
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:Date,
    createdBy: [{type:ObjectId, ref:"Users"}],
    content: [{
        title: String,
        description: String,
        duration: String,
        videos: [{
            title: String,
            description: String,
            video:{}
        }]
    }],
    reviews: [{
        reviewedBy: [{type:ObjectId, ref:"Users"}],
        text: String,
        ratings: String
    }],
    students:[{type:ObjectId, ref:"Users"}]
});


module.exports = mongoose.model('Courses',  projectsSchema);