var express = require('express');
var bodyParser = require('body-parser');
var { ObjectCategory } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Question } = require('./models/question');

var app = express();
const port = process.env.PORT || 3000;

var corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'X-Requested-With'
};

app.use(bodyParser.json());

app.post('/questions', (req, res) => {
  res.header(corsHeaders);
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
  res.header(corsHeaders);
  Question.find().then(
    questions => {
      res.send({ questions });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/questions/:category', (req, res) => {
  res.header(corsHeaders);
  var category = req.params.category;
  Question.find({ category: { $eq: category } })
    .then(questions => {
      if (!questions) {
        return res.status(404).send();
      }
      res.send({ questions });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started up at ${port}`);
});

module.exports = { app };
