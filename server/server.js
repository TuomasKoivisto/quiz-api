var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Question } = require('./models/question');

var app = express();

app.use(bodyParser.json());

app.post('/questions', (req, res) => {
  var question = new Question({
    question: 'test question',
    answer: 'right answer',
    wrongAnswer: 'wrong answer',
    category: 'test'
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

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = { app };
