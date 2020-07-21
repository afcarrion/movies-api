const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe.only('utils - buildMessage', function(){
    describe('When receives an entity and a action', function(){
        it('it should return the respective message', function(){
            const result = buildMessage('Movie', 'Create');
            const expect = 'Movie Created';
            assert.strictEqual(result, expect);
        });
    });

    describe('When receives an entity and an action and is a list', function(){
        it('Should return the respective message with the entity in plural',function () {
            const result = buildMessage('Movie', 'List');
            const expected = 'Movies Listed';
            assert.strictEqual(result, expected); 
        })
    })
});