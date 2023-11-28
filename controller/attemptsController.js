const attemptsService = require('../services/attemptsService');
const questionsService = require('../services/questionsService')
const MESSAGE = {
    100: "Practice more to improve it :D",
    200: "Good, keep up!",
    300: "Well done!",
    400: "Perfect!!",
};
const calScore =(correctAns, userAns)=>{
    let score = 0;
    if(correctAns && userAns) {
        for(let key of Object.keys(userAns)){
            if(correctAns[key] == userAns[key]) 
            score = score + 1;
        }
    }
    return score;
}
const feedback = (score) => {
    switch(true){
        case (score<5):
            return MESSAGE[100];
        case (score>=5 && score<=7):
            return MESSAGE[200];
        case (score>=7 && score<9):
            return MESSAGE[300];
        case(score>=9 && score<=10):
             return MESSAGE[400];
    }
}
module.exports = {
    startAttempt: async (req,res) => {
        try {
            const listQuestions = await questionsService.generateQuestions();
            const correctAnswers = listQuestions.reduce((prev, curr) => {
                prev[curr._id] = curr.correctAnswer;
               return prev;
            }, {});
            const newAttempt = await attemptsService.create({
                questions: listQuestions,
                startedAt: new Date().now,
                correctAnswers,
                completed: false,
                score: 0,
            })
            const result = newAttempt.toObject();
            delete result.correctAnswers;
            return res.status(201).json(result);
        } catch (errors) {
            console.log(errors,'errors')
            return errors;
        }
    },
    submit: async (req,res) => {
        try {
            const {id} = req.params;
            const {userAnswers} = req.body;
            const findAttempt = await attemptsService.findById({
                attemptId: id,
            })
            if(findAttempt) {
                if(findAttempt.completed !== true) {
                    console.log('here')
                    const correctAnswers = findAttempt.correctAnswers;
                    const score = calScore(correctAnswers, userAnswers);
                    const scoreText = feedback(score);
                    const updateAttempt = await attemptsService.update({
                        attemptId: findAttempt._id,
                        score,
                        scoreText,
                        userAnswers,
                    })
                    res.status(200).json(updateAttempt);
                } else {
                    res.status(200).json(findAttempt);
                }
            } else {
                return res.json('Attempt not found!');
            }
        } catch (errors) {
            console.log(errors,'errors');
            return errors;
        }
    }
}