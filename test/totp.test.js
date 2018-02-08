const expect = require('chai').expect;

const getTotp = require('../src/util/getTotp')

describe('totp resource', () => {
    describe('with create', () => {
        it('should create a new totp', (done) => {
            expect(getTotp("JBSWY3DPEHPK3PXP")).to.be.not.null;
            done();
        });
    });
});
