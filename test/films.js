var app = require('../app.js'),
  chai = require('chai'),
  request = require('supertest');
describe('POST /films', function() {
  it('responds with json', function(done) {
  request(app)
    .post('/api/films/add')
    .send({name: 'The Spiderman', description: 'test' , rating:'4', ticket_price:'100', country:'pakistan',genre:'action',release_date:'20th June 2020'})
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
    	console.log(res)
      if (err) return done(err);
      done();
    });
  });
});

describe('GET /api/films/getAll', function() {
  it('responds with json', function(done) {
  request(app)
    .get('/api/films/getAll')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      console.log(res)
      if (err) return done(err);
      done();
    });
  });
});

// describe('GET /api/films/:slug', function() {
//   it('responds with json', function(done) {
//   request(app)
//     .get('/api/films/:slug')
//     .send({name: 'batman'})
//     .set('Accept', 'application/json')
//     .expect(200)
//     .end(function(err, res) {
//       console.log(res)
//       if (err) return done(err);
//       done();
//     });
//   });
// });