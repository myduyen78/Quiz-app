const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    text: String,
    answers: Array,
    correctAnswer: Number,
});

module.exports = mongoose.model('questions', QuestionSchema);
