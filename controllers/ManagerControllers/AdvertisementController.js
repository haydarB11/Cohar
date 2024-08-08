const { AdvertisementService } = require('../../services/AdvertisementService');
const { UserService } = require('../../services/UserService');
const { NotificationService } = require('../../services/NotificationService');


module.exports = {

    addAdvertisement: async (req, res) => {
        const data = req.body;
        data.manager_id = req.user.id;
        if (req.file?.path) {
            data.image = req.file.path;
        } else {
            return res.status(400).send({
                data: 'file is required',
            });
        }
        const result = await new AdvertisementService(data).add();
        const tokens = await UserService.getTokenFromDataBase();
        const splitTokens = await UserService.splitTokens(tokens, 500);
        const notificationData = {
            title: 'new ads added',
            body: data.title,
        }
        const notification = await NotificationService.send(splitTokens, notificationData);
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteAdvertisement: async (req, res) => {
        const result = await AdvertisementService.delete(req.body.ids);
        res.status(result.status).send({
            data: result.data,
        });
    },

    editAdvertisement: async (req, res) => {
        const data = req.body;
        data.id = req.params.advertisement_id;
        data.image = req.file?.path;
        const result = await AdvertisementService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllAdvertisements: async (req, res) => {
        const result = await AdvertisementService.getAll();
        res.status(result.status).send({
            data: result.data,
        });
    },

}