const { DetermineLevelService } = require('../../services/DetermineLevelService');

module.exports = {

    addDetermineLevel: async (req, res) => {
        const data = req.body;
        const result = await new DetermineLevelService(data).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    addManyDetermineLevel: async (req, res) => {
        const {data} = req.body;
        const {starting_quiz_id} = req.params;
        const factoredData = data.map( (item) => ({
            starting_quiz_id: starting_quiz_id,
            timeline_id: item.timeline_id,
            percentage: item.percentage

        }))
        const result = await DetermineLevelService.addMany(factoredData);
        res.status(result.status).send({
            data: result.data,
        });
    },

    editDetermineLevel: async (req, res) => {
        const data = req.body;
        data.id = req.params.determine_level_id;
        const result = await DetermineLevelService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteDetermineLevel: async (req, res) => {
        const result = await DetermineLevelService.delete(req.body.ids);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllDetermineLevelsForOneCourse: async (req, res) => {
        const result = await DetermineLevelService.getAllForOneCourse(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllDetermineLevelsForOneStartingQuiz: async (req, res) => {
        const result = await DetermineLevelService.getAllForOneStartingQuiz(req.params.starting_quiz_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllDetermineLevels: async (req, res) => {
        const data = {manager_id: req.user.id};
        const result = await DetermineLevelService.getAll(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

}