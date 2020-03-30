var app = require('../app.js'),
  chai = require('chai'),
  request = require('supertest');
describe('POST /login', function() {
  it('responds with json', function(done) {
  request(app)
    .post('/api/login')
    .send({email: 'ovaisrafiq@gmail.com', password: 'ovais'})
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});