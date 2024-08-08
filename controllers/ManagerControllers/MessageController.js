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
    
    deleteMessage: async (req, res) => {
        const result = await MessageService.delete(req.params.message_id);
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    editMessage: async (req, res) => {
        const data = req.body;
        data.message_id = req.params.message_id;
        const result = await MessageService.edit(data);
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

}