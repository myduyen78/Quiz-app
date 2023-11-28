const Questions = require('../models/questions');

module.exports = {
    generateQuestions: async (data) => {
        try {
            const result = await Questions.aggregate().sample(10);
            return result;
        } catch (errors) {
            return errors;
        }
    }
}