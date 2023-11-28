const Questions = require('../models/questions');
const Attempts = require('../models/attempts');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;
module.exports = {
    create: async (data) => {
        try {
            const set = {};
            set.questions = data.questions;
            set.startedAt = data.startedAt;
            set.correctAnswers = data.correctAnswers;
            set.completed = data.completed;
            set.score = data.score;
            set.answers = data.answers;
            set.scoreText = data.scoreText;
            const result = await Attempts.create(set);
            return result;
        } catch (errors) {
            return errors;
        }
    },
    update: async (data) => {
        try {
            const conditions = {};
            const set = {};
            if(data?.attemptId) {
                conditions._id = ObjectId(data.attemptId);
            } 
            if(data?.score) {
                set.score = data.score;
            }
            if(data?.scoreText) {
                set.scoreText = data.scoreText
            }
            if(data?.userAnswers) {
                set.userAnswers = data.userAnswers
            }
            set.completed = true;
            const result = await Attempts.findOneAndUpdate(conditions, set, {new: true});
            return result;
        } catch (errors) {
            return errors;
        }
    },
    findById: async (data) => {
        try {
            const conditions = {
                _id: ObjectId(data.attemptId),
            };
            const result = await Attempts.findOne(conditions);
            return result;
        } catch (errors) {
            return errors;
        }
    }
}