const { MessageService } = require('../../services/MessageService');

module.exports = {
    
    sendMessage: async (req, res) => {
        const data = req.body;
        data.sender_id = req.user.id;
        const result = await new MessageService(data).add();
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    getInbox: async (req, res) => {
        const result = await MessageService.getInbox(req.user.id);
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    getOutbox: async (req, res) => {
        const result = await MessageService.getOutbox(req.user.id);
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    getAllMessagesBetweenSpecificUsers: async (req, res) => {
        const data = req.query;
        data.user_id = req.user.id;
        const result = await MessageService.getAllBetweenSpecificUsers(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

}