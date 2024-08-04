const { default: mongoose } = require("mongoose");
const UserModel = require("../models/UserModel");

const CreateUser = async (req, res) => {
    const { username, email, profilePicture, clerkID } = req.body;
    if (username && email && profilePicture && clerkID) {
        try{
            const UserData = new UserModel({
                username: username,
                email: email,
                profilePicture: profilePicture,
                clerkID: clerkID
            })
    
            //save the UserData
            await UserData.save();
    
            return res.json({
                success: true,
                message: "new User created successfully"
            })
        }
        catch(error){
            console.error(error);
            return res.json({
                success : false,
                message : "Server error :("
            })
        }
    }   
    else
        return res.json({
            success: false,
            message: "Insufficient Data"
        })
}

const ReadAllUser = async (req, res) => {

    try {
        //fetching all users
        const UserData = await UserModel.find();

        return res.json({
            success: true,
            message: "Users fetched successfully",
            users: UserData
        })
    }
    catch (error) {
        console.error(error)
        return res.json({
            success: false,
            message: "Internal server error :("
        })
    }

}

const ReadUser = async (req, res) => {
    const clerkID = req.params.clerkID;
    //console.log(clerkID);
    if (clerkID) {
        try {
            const userData = await UserModel.findOne({ clerkID: clerkID }).lean(); // using .lean() to get a plain JavaScript object
            
            if (userData) {
                return res.json({
                    success: true,
                    data: userData
                });
            } else {
                return res.json({
                    success: false,
                    message: "User not found"
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
            message: "Insufficient Data"
        });
    }
}


const UpdateUser = async (req, res) => {
    const { clerkID, username, email, profilePicture } = req.body;
    if (clerkID) {
        try {
            const updatedData = {};
            if (username) updatedData.username = username;
            if (email) updatedData.email = email;
            if (profilePicture) updatedData.profilePicture = profilePicture;
            updatedData.updatedAt = Date.now();

            const updatedUser = await UserModel.findOneAndUpdate(
                { clerkID: clerkID },
                updatedData,
                { new: true } // To return the updated document
            );

            if (updatedUser) {
                return res.json({
                    success: true,
                    message: "User updated successfully",
                    user: updatedUser
                });
            } else {
                return res.json({
                    success: false,
                    message: "User not found"
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
            message: "Insufficient Data"
        });
    }
};


const DeleteUser = async (req, res) => {
    const { clerkID } = req.body;
    if (clerkID) {
        try {
            const deletedUser = await UserModel.findOneAndDelete({ clerkID: clerkID });

            if (deletedUser) {
                return res.json({
                    success: true,
                    message: "User deleted successfully"
                });
            } else {
                return res.json({
                    success: false,
                    message: "User not found"
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
            message: "Insufficient Data"
        });
    }
};

module.exports = {
    CreateUser,
    ReadAllUser,
    ReadUser,
    UpdateUser,
    DeleteUser
}