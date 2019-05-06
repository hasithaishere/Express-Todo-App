const { expect } = require('chai');
const request = require('request-promise');

const BASE_URL = 'http://localhost:3000';

describe('Management APIs', () => {
    it('/authenticate - Valid user', (done) => {
        const options = {
            method: 'POST',
            uri: `${BASE_URL}/mgt/authenticate`,
            body: {
                name: 'Hasitha',
                password: 'abc123',
            },
            json: true,
        };

        request(options).then((response) => {
            const { success, message, token } = response;
            // eslint-disable-next-line no-unused-expressions
            expect(success).to.be.true;
            expect(message).to.equal('Enjoy your token!');
            // eslint-disable-next-line no-unused-expressions
            expect(token).to.be.string;

            done();
        }).catch(error => done(error));
    });
});
