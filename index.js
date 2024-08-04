const express = require('express');
const dotenv = require("dotenv");
const ConnectToDatabase = require('./config/DB_conection');
const UserRouter = require('./routes/UserRouter');
const CourseRouter = require('./routes/CourseRouter');
const AnnouncementRouter = require('./routes/AnnouncementRouter');
const EventRouter = require('./routes/EventsRouter');
const { courseInProgress, courseCompleted, certificationStreak, dailyLearningTime, courseScores } = require('./DummyData');
const ProjectRouter = require('./routes/ProjectRoute');
const UploadRouter = require('./routes/UploadRoute');
const checkAuth = require('./middlewares/Auth');
const app = express();
const cors = require('cors')

const PORT = process.env.PORT || 5500;

app.use(express.json());
dotenv.config();
app.use(cors());

app.get('/', (req,res) => {
    res.send("Hellow from server ,it's running absolutely fine :)");
})

//custom routes
app.use('/user', UserRouter);
//app.use('/course', CourseRouter);
app.use('/announcement', AnnouncementRouter);
app.use('/event', EventRouter)
app.use('/project',  ProjectRouter)
app.use('/util', UploadRouter);

app.get("/dummy-dashboard", (req,res) => {
    const dummyData = {
        courseInProgress : courseInProgress,
        courseCompleted : courseCompleted,
        certificationStreak : certificationStreak,
        dailyLearningTime : dailyLearningTime,
        courseScores : courseScores
    }

    res.json({
        message : "Dummy data fetched",
        data : dummyData
    })
})

app.listen(PORT, async() => {
    console.log("Server is starting...");
    await ConnectToDatabase(process.env.DB_URL);
    console.log("Server is up and running on PORT : "+PORT);
})