const mongoose = require("mongoose");

const attemptSchema = mongoose.Schema({
    questions: [{
        answers: Array,
        text: String,
    }],
    startedAt: {
        type: Date,
        default: Date.now,
    },
    correctAnswers: Object,
    completed: {
        type: Boolean,
        default: false,
    },
    score: {
       type: Number,
    },
    userAnswers: Object, default: {},
    scoreText: String
});
module.exports = mongoose.model("attempts", attemptSchema);
