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
const cors = require('cors');
const PostRouter = require('./routes/PostRouter');
const axios = require('axios')

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
app.use("/post", PostRouter)

const githubToken = process.env.GITHUB_ACCESS_TOKEN;


app.get("/github-data/commits", async(req,res) => {
    try {
        const { owner, repo } = req.query;
    
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
          headers: {
            Authorization: `token ${githubToken}`,
          },
        });
    
        const commits = response.data.map(commit => ({
          sha: commit.sha,
          author: commit.commit.author.name,
          date: commit.commit.author.date,
          message: commit.commit.message,
        }));
        res.json(commits);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching commits' });
      }
})

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