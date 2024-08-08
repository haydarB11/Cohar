require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize, Level, Course } = require('./models');
const app = express();
const cors = require('cors');
const isAuthPdf = require('./utils/auth/jwtMiddlewareForPdf');
const cron = require('node-cron');
const { deleteExpiredCodes } = require('./controllers/ManagerControllers/CodeController');
const {getToken} = require('./controllers/ManagerControllers/VideoController');

const corsOptions = { 
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    headers: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const job = new cron.schedule('0 0 * * *', deleteExpiredCodes);
app.use('/Cohar/public', express.static(path.join(__dirname, 'public')));
app.get('/Cohar', (req, res) => {
    return res.json("welcome to Cohar app!");
});

app.get('/Cohar/upload', async (req, res) => {
    try {
        const levels = await Level.findAll({
            include: [
                {
                    model: Course,
                    as: 'course'
                }
            ]
        });
        res.render('upload', { levels: levels });
    } catch (error) {
        console.log(error.message);
    }
});
// manager routes
app.use('/Cohar/manager/comments', require('./routes/ManagerRoutes/CommentRouter'));
app.use('/Cohar/manager/determine-levels', require('./routes/ManagerRoutes/DetermineLevelRouter'));
app.use('/Cohar/manager/starting-quiz', require('./routes/ManagerRoutes/StartingQuizRouter'));
app.use('/Cohar/manager/users', require('./routes/ManagerRoutes/UserRouter'));
app.use('/Cohar/manager/codes', require('./routes/ManagerRoutes/CodeRouter'));
app.use('/Cohar/manager/advertisements', require('./routes/ManagerRoutes/AdvertisementRouter'));
app.use('/Cohar/manager/courses', require('./routes/ManagerRoutes/CourseRouter'));
app.use('/Cohar/manager/levels', require('./routes/ManagerRoutes/LevelRouter'));
app.use('/Cohar/manager/pdfs', require('./routes/ManagerRoutes/PdfRouter'));
app.use('/Cohar/manager/videos', require('./routes/ManagerRoutes/VideoRouter'));
app.use('/Cohar/manager/previous-exams', require('./routes/ManagerRoutes/PreviousExamRouter'));
app.use('/Cohar/manager/quiz', require('./routes/ManagerRoutes/QuizRouter'));
app.use('/Cohar/manager/questions', require('./routes/ManagerRoutes/QuestionRouter'));
app.use('/Cohar/manager/exercise-questions', require('./routes/ManagerRoutes/ExerciseQuestionRouter'));
app.use('/Cohar/manager/answers', require('./routes/ManagerRoutes/AnswerRouter'));
app.use('/Cohar/manager/exercise-answers', require('./routes/ManagerRoutes/ExerciseAnswerRouter'));
app.use('/Cohar/manager/timelines', require('./routes/ManagerRoutes/TimeLineRouter'));
app.use('/Cohar/manager/ordered-lectures', require('./routes/ManagerRoutes/OrderLectureRouter'));
app.use('/Cohar/manager/messages', require('./routes/ManagerRoutes/MessageRouter'));
app.use('/Cohar/manager/quiz-students', require('./routes/ManagerRoutes/QuizStudentRouter'));
app.use('/Cohar/manager/notification', require('./routes/ManagerRoutes/NotificationRoute'));

// user routes
app.use('/Cohar/users/quiz-students', require('./routes/UserRoutes/QuizStudentRouter'));
app.use('/Cohar/users/codes', require('./routes/UserRoutes/CodeRouter'));
app.use('/Cohar/users/advertisements', require('./routes/UserRoutes/AdvertisementRouter'));
app.use('/Cohar/users/courses', require('./routes/UserRoutes/CourseRouter'));
app.use('/Cohar/users/starting-quiz', require('./routes/UserRoutes/StartingQuizRouter'));
app.use('/Cohar/users/comments', require('./routes/UserRoutes/CommentRouter'));
app.use('/Cohar/users/timelines', require('./routes/UserRoutes/TimeLineRouter'));
app.use('/Cohar/users/ordered-lectures', require('./routes/UserRoutes/OrderLectureRouter'));
app.use('/Cohar/users/quiz', require('./routes/UserRoutes/QuizRouter'));
app.use('/Cohar/users/messages', require('./routes/UserRoutes/MessageRouter'));
app.use('/Cohar/users/levels', require('./routes/UserRoutes/LevelRouter'));
app.use('/Cohar/users/pdfs', require('./routes/UserRoutes/PdfRouter'));
app.use('/Cohar/users/videos', require('./routes/UserRoutes/VideoRouter'));
app.use('/Cohar/users', require('./routes/UserRoutes/UserRouter'));

const server = app.listen({ port: process.env.PORT }, async () => {
    // await sequelize.sync({force:true});
    // await sequelize.sync({alter:true});
    console.log('starting on port : ' + process.env.PORT);
});