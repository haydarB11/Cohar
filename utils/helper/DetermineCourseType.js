const { type } = require('../../statics/CourseStatic.json');

module.exports = {

    determineCourseType(data) {
        if (data.category_id) {
            data.type = type.jci;
        } else if (data.collage_year_id) {
            data.type = type.course;
        } else {
            data.type = type.outerCourse;
        }
        const courseType = data.type;
    
        return courseType;
    }
    
}
