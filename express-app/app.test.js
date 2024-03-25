const request = require('supertest');
const {app, server} = require('./app'); 

afterAll((done) => {
    server.close(done);
});

describe('POST /user/info', () => {
    it('responds with json', async () => {
        const testsend = {
            score: 1.0,
            email:'test'
        };
        const response = await request(app)
            .post('/user/info')
            .send(testsend)
            .expect('Content-Type', 'application/json; charset=utf-8');
        
        expect(response.body).toEqual({status: 'success'});
    });
});