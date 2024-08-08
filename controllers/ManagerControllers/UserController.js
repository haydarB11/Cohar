const { UserService } = require('../../services/UserService');


module.exports = {

    userRegister: async (req, res) => {
        const result = await new UserService(req.body).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    managerLogin: async (req, res) => {
        const result = await UserService.managerLogin(req.body);
        res.status(result.status).send({
            data: result.data,
        });
    },

    editUser: async (req, res) => {
        const data = req.body;
        data.id = req.params.user_id;
        const result = await UserService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteUser: async (req, res) => {
        const result = await UserService.delete(req.params.user_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    editOwnAccount: async (req, res) => {
        const data = req.body;
        data.id = req.user.id;
        const result = await UserService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllUsersWithTheirMarksForOneCourse: async (req, res) => {
        const result = await UserService.getAllStudentsWithMarksForOneCourse(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllUsersWithAttemptsOnly: async (req, res) => {
        const result = await UserService.getAllWithAttemptsOnly();
        res.status(result.status).send({
            data: result.data,
        });
    },

}