const mongoose = require("mongoose");

const ConnectToDatabase = async(url) => {
    try{
        console.log("Attempting to connect with MongoDB...");
        await mongoose.connect(url);
        console.log("Connected to MongoDB successfully");
    }
    catch(error){
        console.error(error);
        throw error
    }
}

module.exports = ConnectToDatabase;