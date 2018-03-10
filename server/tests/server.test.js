const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Question } = require('./../models/question');

const questions = [
  {
    question: 'test question1',
    answer: 'right answer1',
    wrongAnswer: 'wrong answer1',
    category: 'test1'
  },
  {
    question: 'test question2',
    answer: 'right answer2',
    wrongAnswer: 'wrong answer2',
    category: 'test2'
  }
];

beforeEach(done => {
  Question.remove({})
    .then(() => {
      return Question.insertMany(questions);
    })
    .then(() => done());
});

describe('POST /questions', () => {
  it('should create a new question', done => {
    var question = {
      question: 'test question',
      answer: 'right answer',
      wrongAnswer: 'wrong answer',
      category: 'test'
    };

    request(app)
      .post('/questions')
      .send({ question })
      .expect(200)
      .expect(res => {
        expect(res.body.question).toBe(question.question);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Question.find({ question })
          .then(questions => {
            expect(questions.length).toBe(1);
            expect(questions[0].question).toBe(question.question);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create question with invalid data', done => {
    request(app)
      .post('/questions')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Question.find()
          .then(questions => {
            expect(questions.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /questions', () => {
  it('should get all questions', done => {
    request(app)
      .get('/questions')
      .expect(200)
      .expect(res => {
        expect(res.body.questions.length).toBe(2);
      })
      .end(done);
  });
});
