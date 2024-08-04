const UserModel = require("../models/UserModel");

const checkAuth = async(req,res, next) => {
    const {clerkID} = req.body;
    if (!clerkID) {
        return res.status(400).json({success : false, message: 'Clerk ID is required.' });
    }

    try {
        const UserData = await UserModel.findOne({
            clerkID : clerkID
        })
        if(!UserData){
            return res.json({
                success : false,
                message : "UnAuthenticated"
            })
        }

        req.owner = UserData._id

        next();

    }catch(error){
        console.error(error);
        return res.status(500).json({ success : false,
             message: 'Internal Server Error' });
    }
}

module.exports = checkAuth;