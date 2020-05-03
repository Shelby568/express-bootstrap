/**
 * @jest-environment node
 */

const request = require('supertest');
const app = require('../src/app');
const nock = require('nock');
const {
  mockJokesResponse,
  mockRandomResponse,
  mockPersonalResponse,
} = require('../test-data/test-data');

describe('GET / - Homepage', () => {
  it('should respond with some homepage markup', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Welcome to my jokes API');
  });
});

describe('GET /jokes', () => {
  it('should respond with a joke', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockJokesResponse);
    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.jokes).toEqual(mockJokesResponse.value);
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });
    const res = await request(app).get('/jokes');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('huge error');
  });
});

describe('GET /joke/random', () => {
  it('should respond with a random joke', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockRandomResponse);
    const res = await request(app).get('/joke/random');
    expect(res.statusCode).toEqual(200);
    expect(res.body.randomJoke).toEqual(mockRandomResponse.value);
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 404, message: 'Unknown resource' });
    const res = await request(app).get('/joke/random');
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual('Unknown resource');
  });
});

describe('GET /joke/random/personal', () => {
  it('should respond with a personalised joke', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .reply(200, mockPersonalResponse);
    const res = await request(app).get('/joke/random/personal/manchester/codes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.personalJoke).toEqual(mockPersonalResponse.value);
  });
  it('should respond with an error message if something goes wrong', async () => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .replyWithError({ statusCode: 500, message: 'Bad Request' });
    const res = await request(app).get('/joke/random/personal/manchester/codes');
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual('Bad Request');
  });
});
