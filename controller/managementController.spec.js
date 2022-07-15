const { expect } = require('chai');
const rewire = require('rewire');

describe('authenticate Controller Function', () => {
  let managementController;

  before(() => {
    managementController = rewire('./managementController');
  });

  it('Sould return error for if user not in the system', (done) => {
    let finalResponse;
    const req = { body: { name: 'hasitha' } };
    const res = {
      json: (response) => {
        finalResponse = response;
      },
    };

    /* eslint no-underscore-dangle: 0 */
    managementController.__set__('User', { findOne: async () => null });
    /* eslint-disable no-unused-expressions */
    managementController
      .authenticate(req, res)
      .then(() => {
        expect(finalResponse.success).to.be.false;
        expect(finalResponse.message).to.equal(
          'Authentication failed. User not found.',
        );
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('Sould return error for invalid password', (done) => {
    let finalResponse;
    const req = { body: { name: 'hasitha', password: 'VALID-PASSWORD' } };
    const res = {
      json: (response) => {
        finalResponse = response;
      },
    };

    managementController.__set__('User', {
      findOne: async () => ({ password: 'INVALID-PASSWORD' }),
    });

    managementController
      .authenticate(req, res)
      .then(() => {
        expect(finalResponse.success).to.be.false;
        expect(finalResponse.message).to.equal(
          'Authentication failed. Wrong password.',
        );
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
