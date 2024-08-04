const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    projectTitle : String,
    projectDescription : String,
    links : [{
        type : String
    }
    ],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    bannerURL : String,
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const ProjectModel = new mongoose.model('projects', ProjectSchema);

module.exports = ProjectModel;