const express = require('express');
const dotenv = require("dotenv");
const ConnectToDatabase = require('./DB_config/DB_conection');
const UserRouter = require('./routes/UserRouter');
const app = express();

const PORT = process.env.PORT || 5500;

app.use(express.json());
dotenv.config();

app.get('/', (req,res) => {
    res.send("Hellow from server ,it's running absolutely fine :)");
})

//custom routes
app.use('/user', UserRouter);

app.listen(PORT, async() => {
    console.log("Server is starting...");
    await ConnectToDatabase(process.env.DB_URL);
    console.log("Server is up and running on PORT : "+PORT);
})