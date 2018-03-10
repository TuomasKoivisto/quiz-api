var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Question } = require('./models/question');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/questions', (req, res) => {
  var question = new Question({
    question: req.body.question,
    answer: req.body.answer,
    wrongAnswer: req.body.wrongAnswer,
    category: req.body.category
  });

  question.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/questions', (req, res) => {
  Question.find().then(
    questions => {
      res.send({ questions });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.listen(port, () => {
  console.log(`Started up at ${port}`);
});

module.exports = { app };
