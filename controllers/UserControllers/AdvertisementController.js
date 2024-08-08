const { AdvertisementService } = require('../../services/AdvertisementService');


module.exports = {

    getAllAdvertisements: async (req, res) => {
        const result = await AdvertisementService.getAll();
        res.status(result.status).send({
            data: result.data,
        });
    },

}