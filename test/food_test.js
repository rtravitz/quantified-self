assert = require('chai').assert;
Food = require('../lib/food');

describe("Food", function() {
  it("has a name and calories", function() {
    food = new Food('yogurt', '120');


    assert.equal(food.name, 'yogurt');
    assert.equal(food.calories, '120');
  });
});
