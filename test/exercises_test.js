var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("exercises.html", function() {
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

  test.it("user can create a new exercise with a name and calories", function() {
    driver.get('http://localhost:8080/exercises.html');
    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});
    var submit = driver.findElement({id: 'add-exercise-btn'});

    name.sendKeys('running');
    calories.sendKeys('500');
    submit.click();

    driver.findElement({css: '.exercise-table tbody tr td:nth-of-type(1)'})
    .getText().then(function(exerciseName) {
      assert.equal(exerciseName, 'running');
    });

    driver.findElement({css: '.exercise-table tbody tr td:nth-of-type(2)'})
    .getText().then(function(exerciseCalories) {
      assert.equal(exerciseCalories, '500');
    });
  });
});

