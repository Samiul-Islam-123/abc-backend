const { CreateUser, ReadUser, ReadAllUser, UpdateUser, DeleteUser } = require('../controllers/UserController');

const UserRouter = require('express').Router();

UserRouter.post("/create-user", CreateUser);
UserRouter.get("/read-users/:clerkID", ReadUser);
UserRouter.get("/read-users-all", ReadAllUser);
UserRouter.put("/update-user",UpdateUser);
UserRouter.delete("/delete-user",DeleteUser);


module.exports = UserRouter;