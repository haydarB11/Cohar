const { Pdf } = require('../models');
const httpStatus = require('../utils/httpStatus');

class PdfService {

    constructor(data) {
        this.url = data.url;
        this.level_id = data.level_id;
    }

    static async addAll(data, t) {
        try {
            const pdfs = await Pdf.bulkCreate(data, { transaction: t });
            return {
                data: pdfs,
                status: httpStatus.OK
            };
        } catch (error) {
            await t.rollback();
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    async add() {
        try {
            const pdf = await Pdf.create(this);
            return {
                data: pdf,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async delete(id) {
        try {
            const pdf = await Pdf.findByPk(id);
            const deletedPdf = await Pdf.destroy({
                where: {
                    id: id
                }
            });
            if (deletedPdf === 1) {
                return {
                    data: 'deleted',
                    status: httpStatus.OK
                };
            } else {
                return {
                    data: 'something went wrong',
                    status: httpStatus.BAD_REQUEST
                };
            }
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

}

module.exports = { PdfService };