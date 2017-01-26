assert    = require('chai').assert;
Exercise  = require('../lib/exercise');

describe("Exercise", function() {
  it("has a name and calories", function() {
    food = new Exercise('running', '500');

    assert.equal(food.name, 'running');
    assert.equal(food.calories, '500');
  });
});

