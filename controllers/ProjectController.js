const ProjectModel = require("../models/ProjectModel");

const axios = require('axios');
const UserModel = require("../models/UserModel");

const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${process.env.API_URL}/util/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.success === true) {
            return response.data.url;
        } else {
            throw new Error('File upload failed');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error uploading file');
    }
};


// Create a new project
const createProject = async (req, res) => {
    const { projectTitle, projectDescription, links, clerkID, bannerURL } = req.body;
    const bannerFile = req.file;

    var owner = '';

    if (clerkID) {
        const userData = await UserModel.findOne({
            clerkID: clerkID
        })
        if (!userData)
            return res.json({
                message: "User not found",
                success: false
            })

        owner = userData._id
    }

    if (projectTitle && projectDescription && owner) {
        try {

            const projectData = new ProjectModel({
                projectTitle,
                projectDescription,
                links,
                owner,
                bannerURL
            });

            // Save the project data
            await projectData.save();

            return res.json({
                success: true,
                message: "Project created successfully",
                project: projectData
            });
        } catch (error) {
            console.error(error);
            return res.json({
                success: false,
                message: "Server error :("
            });
        }
    } else {
        return res.json({
            success: false,
            message: "Insufficient data"
        });
    }
};

// Get all projects
const readAllProjects = async (req, res) => {
    try {
        // Fetching all projects
        const {clerkID} = req.params;
        //console.log(clerkID)
        if(!clerkID){
            return res.json({
                message : "ClerkID not found",
                success : false
            })
        }
        
        const userData = await UserModel.findOne({
            clerkID : clerkID
        })

        if(!userData){
            return res.json({
                message : "user not found",
                success : false
            })
        }



        const projectData = await ProjectModel.find({
            owner : userData._id
        }).populate('owner', 'username email');

        return res.json({
            success: true,
            message: "Projects fetched successfully",
            projects: projectData
        });
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: "Internal server error :("
        });
    }
};

// Get a single project by ID
const readProject = async (req, res) => {
    const { id } = req.params;
    //console.log(req.params)
    if (id) {
        try {
            const projectData = await ProjectModel.findById(id).populate('owner', 'username email');

            if (projectData) {
                return res.json({
                    success: true,
                    message: "Project fetched successfully",
                    project: projectData
                });
            } else {
                return res.json({
                    success: false,
                    message: "Project not found"
                });
            }
        } catch (error) {
            console.error(error);
            return res.json({
                success: false,
                message: "Server error :("
            });
        }
    } else {
        return res.json({
            success: false,
            message: "Insufficient data"
        });
    }
};

// Update a project
const updateProject = async (req, res) => {
    const { id, projectTitle, projectDescription, links, bannerURL } = req.body;
    if (id) {
        try {
            const updatedData = {};
            if (projectTitle) updatedData.projectTitle = projectTitle;
            if (projectDescription) updatedData.projectDescription = projectDescription;
            if (links) updatedData.links = links;
            if (bannerURL) updatedData.bannerURL = bannerURL;
            updatedData.updatedAt = Date.now();

            const updatedProject = await ProjectModel.findByIdAndUpdate(
                id,
                updatedData,
                { new: true } // To return the updated document
            );

            if (updatedProject) {
                return res.json({
                    success: true,
                    message: "Project updated successfully",
                    project: updatedProject
                });
            } else {
                return res.json({
                    success: false,
                    message: "Project not found"
                });
            }
        } catch (error) {
            console.error(error);
            return res.json({
                success: false,
                message: "Server error :("
            });
        }
    } else {
        return res.json({
            success: false,
            message: "Insufficient data"
        });
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    const { id } = req.body;
    if (id) {
        try {
            const deletedProject = await ProjectModel.findByIdAndDelete(id);

            if (deletedProject) {
                return res.json({
                    success: true,
                    message: "Project deleted successfully"
                });
            } else {
                return res.json({
                    success: false,
                    message: "Project not found"
                });
            }
        } catch (error) {
            console.error(error);
            return res.json({
                success: false,
                message: "Server error :("
            });
        }
    } else {
        return res.json({
            success: false,
            message: "Insufficient data"
        });
    }
};

module.exports = {
    createProject,
    readAllProjects,
    readProject,
    updateProject,
    deleteProject
};
