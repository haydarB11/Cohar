const { OrderLectureService } = require('../../services/OrderLectureService');
const httpStatus = require('../../utils/httpStatus');
const { sequelize } = require('../../models');

module.exports = {

    addOrderLecture: async (req, res) => {
        const data = req.body;
        data.user_id = req.user.id;
        const result = await new OrderLectureService(data).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    addManyOrderLectures: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const pdf_ids = req.body.data;
            const data = {};
            data.user_id = req.user.id;
            for (let i = 0; i < pdf_ids.length; i++) {
                data.pdf_id = pdf_ids[i]
                const result = await new OrderLectureService(data).add(t);
                if (result.status === httpStatus.BAD_REQUEST) {
                    res.status(httpStatus.BAD_REQUEST).send({
                        data: 'bad request',
                    });
                    return;
                }
            }
            await t.commit();
            res.status(httpStatus.OK).send({
                data: 'ordered',
            });

        } catch (error) {
            await t.rollback();
            res.status(httpStatus.BAD_REQUEST).send({
                data: error.message,
            });
        }
    },

}