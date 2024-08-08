const { OrderLectureService } = require('../../services/OrderLectureService');
const { UserService } = require('../../services/UserService');
const httpStatus = require('../../utils/httpStatus');


module.exports = {

    getAllOrderedLecture: async (req, res) => {
        const manager = await UserService.get(req.user.id);
        let result;
        if (manager.data.type === 'supervisor') {
            result = await OrderLectureService.getAll();
        } else if (manager.data.type === 'manager') {
            result = await OrderLectureService.getAllForOneManager(req.user.id);
        } else {
            result = {
                status: httpStatus.FORBIDDEN,
                data: 'you can not access this service',
            }
        }
        res.status(result.status).send({
            data: result.data,
        });
    },

    editOrderLecture: async (req, res) => {
        const data = req.body;
        data.order_id = req.params.order_id;
        const result = await OrderLectureService.editStatus(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

}