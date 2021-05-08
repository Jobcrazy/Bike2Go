const supertest = require('supertest');
//const should = require('should');
const assert = require('assert');
const error_code = require('../common/error_code');

let request = supertest('http://localhost:3000');
let userCookie = null;
let user = {
    "gid": 104110803718816892021,
    "fname": "James Liu",
    "gname": "James",
    "xname": "Liu",
    "email": "liuhang2000@gmail.com",
    "head": "https://lh5.googleusercontent.com/-WmSZDdMVzsg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhRt5YTKrH8CXq2eFAEeFcnis2JA/s96-c/photo.jpg"
};

// URI: /api/user/login
describe('User Login', function() {
    describe('POST /api/user/login', function() {
        // eslint-disable-next-line max-len
        it('Login success', function(done) {
            request
                .post('/api/user/login')
                .send(user)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
    });
});

// URI: /api/user/profile
describe('User Profile', function() {
    describe('POST /api/user/profile', function() {
        it('The current User was login.', function(done) {
            request
                .post('/api/user/profile')
                .set('Cookie', userCookie)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    assert.equal(res.body.code, error_code.error_success.code);
                    if (err) throw err;
                    done();
                });
        });
        beforeEach(function(done) {
            request
                .post('/api/user/login')
                .send(user)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (!err) {
                        userCookie = res.header['set-cookie'];
                        done();
                    }
                });
        });
    });
});

// URI: /api/user/profile
describe('User Profile', function() {
    describe('POST /api/user/profile', function () {
        it('The current User was not login.', function (done) {
            request
                .post('/api/user/profile')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body.code, error_code.error_access.code);
                    if (err) throw err;
                    done();
                });
        });
    });
});