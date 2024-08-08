const { year } = require('../../models/enum.json');

class FactoryHelper {

    static relateCollageWithYear (collage_id, final_year) {
        const collageYears = [];
        let collageYear = {};
        let i = year.findIndex( (current_value, index) => {
            if (current_value === final_year) {
                return ++index;
            }
        });
        while (i >= 0) {
            collageYear.collage_id = collage_id;
            collageYear.year = year[i];
            collageYears.push(collageYear);
            collageYear = {};
            i --;
        }
        return collageYears;
    }

    static relateLevelWithPdf (level_id, pdfs) {
        const factoredPdfs = [];
        let factoredPdf = {};
        for (let i = 0; i < pdfs.length; i++) {
            factoredPdf.level_id = level_id;
            factoredPdf.url = pdfs[i];
            factoredPdfs.push(factoredPdf);
            factoredPdf = {};
        }
        return factoredPdfs;
    }

    static relateLevelWithVideos (level_id, videos) {
        const factoredVideos = [];
        let factoredVideo = {};
        for (let i = 0; i < videos.length; i++) {
            factoredVideo.level_id = level_id;
            factoredVideo.url = videos[i].url;
            factoredVideo.quality = videos[i].quality;
            factoredVideos.push(factoredVideo);
            factoredVideo = {};
        }
        return factoredVideos;
    }

    static determineTimeLineOrder (course_id, data) {
        const factoredTimeLines = [];
        let factoredTimeLine = {};
        for (let i = 0; i < data.length; i++) {
            factoredTimeLine.course_id = course_id;
            factoredTimeLine.quiz_id = data[i].quiz_id;
            factoredTimeLine.level_id = data[i].level_id;
            factoredTimeLine.available = data[i].available;
            factoredTimeLine.order = i + 1;
            factoredTimeLines.push(factoredTimeLine);
            factoredTimeLine = {};
        }
        return factoredTimeLines;
    }

    static determineTimeLineOrderWithListForEachId (course_id, data, manager_id) {
        const factoredTimeLines = [];
        const quiz_ids = [];
        const level_ids = [];
        let factoredTimeLine = {};
        for (let i = 0; i < data.length; i++) {
            factoredTimeLine.course_id = course_id;
            if (data[i].quiz_id) {
                factoredTimeLine.quiz_id = data[i].quiz_id;
                factoredTimeLine.level_id = null;
                quiz_ids.push(data[i].quiz_id);
            } else {
                factoredTimeLine.level_id = data[i].level_id;
                level_ids.push(data[i].level_id);
                factoredTimeLine.quiz_id = null;
            }
            factoredTimeLine.order = i + 1;
            factoredTimeLine.manager_id = manager_id;
            factoredTimeLines.push(factoredTimeLine);
            factoredTimeLine = {};
        }
        let result = {
            factoredTimeLines: factoredTimeLines,
            quiz_ids: quiz_ids,
            level_ids: level_ids
        };
        return result;
    }
}

module.exports = { FactoryHelper };