const { LevelService } = require('../../services/LevelService');


module.exports = {

    getLevelById: async (req, res) => {
        const result = await LevelService.getById(req.params.level_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

}