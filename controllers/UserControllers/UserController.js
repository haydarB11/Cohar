const { UserService } = require('../../services/UserService');


module.exports = {

    userRegister: async (req, res) => {
        const result = await new UserService(req.body).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    userLogin: async (req, res) => {
        const result = await UserService.userLogin(req.body);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getToken: async (req, res) => {
        req.body.user_id = req.user.id;
        const result = await UserService.getToken(req.body);
        res.status(result.status).send({
            data: result.data,
        });
    },

    editUser: async (req, res) => {
        const data = req.body;
        data.id = req.user.id;
        const result = await UserService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    increaseNumberOfIllegalAttemptsToConnect: async (req, res) => {
        const result = await UserService.increaseNumberOfIllegalAttempts(req.user.id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllManagersForEnrolledCourses: async (req, res) => {
        const result = await UserService.getAllManagersForEnrolledCourses(req.user.id);
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    getAllManagersForEnrolledCoursesWhichHaveMessages: async (req, res) => {
        const result = await UserService.getAllManagersForEnrolledCoursesWhichHaveMessages(req.user.id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getOneUser: async (req, res) => {
        const result = await UserService.get(req.user.id);
        res.status(result.status).send({
            data: result.data,
        });
    },

}