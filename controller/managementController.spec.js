const sinon = require('sinon');
var expect = require('chai').expect;
const rewire = require("rewire");

describe('authenticate Controller Function', function(){
  let userStub, managementController;

  before(function(){
    managementController = rewire('./managementController');
  });

  it('Sould return error for if user not in the system', (done) => {
    let finalResponse;  
    const req = { body: { name: 'hasitha' }};
    const res = { json: (response) => finalResponse = response };

    managementController.__set__('User', { findOne: async () => {
      return null;
    }});

    managementController.authenticate(req, res).then(() => {
      expect(finalResponse.success).to.be.false;
      expect(finalResponse.message).to.equal('Authentication failed. User not found.');
      done();
    }).catch((error) => {
      done(error);
    });

  });

  it('Sould return error for invalid password', (done) => {
    let finalResponse;  
    const req = { body: { name: 'hasitha', password: 'VALID-PASSWORD' }};
    const res = { json: (response) => finalResponse = response };

    managementController.__set__('User', { findOne: async () => {
      return { password: 'INVALID-PASSWORD' };
    }});

    managementController.authenticate(req, res).then(() => {
      expect(finalResponse.success).to.be.false;
      expect(finalResponse.message).to.equal('Authentication failed. Wrong password.');
      done();
    }).catch((error) => {
      done(error);
    });

  });
  
})