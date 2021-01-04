var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            console.log('Log indexOf', [1, 2, 3].indexOf(4));

            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            // assert.equal([1, 2, 3, 4].indexOf(4), -1);
            assert.equal([1, 2, 3, 4].indexOf(5), -1);
        });
    });
});

var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return 3 when the value is present', function () {
            assert.equal([1, 2, 3, 4].indexOf(4), 3);
        });
    });
});