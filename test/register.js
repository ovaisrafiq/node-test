var app = require('../app.js'),
  chai = require('chai'),
  request = require('supertest');
describe('POST /register', function() {
  it('responds with json', function(done) {
  request(app)
    .post('/api/register')
    .send({email: 'ovaisrafiq@gmail.com', password: 'ovais' , first_name:'ovais', last_name:'rafiq', gender:'male'})
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
    	console.log(res)
      if (err) return done(err);
      done();
    });
  });
});