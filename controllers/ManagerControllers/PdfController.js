const { PdfService } = require('../../services/PdfService');


module.exports = {

    addPdf: async (req, res) => {
        const data = req.body;
        data.url = req.file.path;
        const result = await new PdfService(data).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    deletePdf: async (req, res) => {
        const result = await PdfService.delete(req.params.pdf_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

}