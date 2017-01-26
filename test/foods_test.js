var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("foods.html", function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  });

  test.afterEach(function() {
    driver.quit();
  });

  test.it("requires a name to create a new food", function() {
    driver.get('http://localhost:8080/foods.html');
    var calories = driver.findElement({name: 'calories'});
    var submit = driver.findElement({id: 'add-food-btn'});
    var nameWarning = driver.findElement({id: 'name-warning'});

    calories.sendKeys('150');
    submit.click();

    nameWarning.getText().then(function(value) {
      assert.equal(value, 'Please enter a food name.');
    });
  });

  test.it("user can create a new food", function() {
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});
    var submit = driver.findElement({id: 'add-food-btn'});

    name.sendKeys('apple');
    calories.sendKeys('150');
    submit.click();

    driver.findElement({css: '.food-table tbody tr td:nth-of-type(1)'})
    .getText().then(function(foodName) {
      assert.equal(foodName, 'apple');
    });

    driver.findElement({css: '.food-table tbody tr td:nth-of-type(2)'})
    .getText().then(function(foodCalories) {
      assert.equal(foodCalories, '150');
    });
  });
});

