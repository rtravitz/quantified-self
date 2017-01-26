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

  test.it("user can create a new food with a name and calories", function() {
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({name: 'name'});
    var calories = driver.findElement({name: 'calories'});
    var submit = driver.findElement({id: 'add-food-btn'});

    name.sendKeys('apple');
    calories.sendKeys('150');
    submit.click();

    driver.findElement({id: 'food-table'}).then(function(table) {
      table.findElements(webdriver.By.css('tr')).then(function(rows) {
        assert.equal(rows.length, 2);

        rows[1].findElement(webdriver.By.className('name-cell'))
          .getText().then(function(foodName) {
            assert.equal(foodName, 'apple');
        });

        rows[1].findElement(webdriver.By.className('calories-cell'))
          .getText().then(function(foodCalories) {
            assert.equal(foodCalories, '150');
        });
      });
    });

    driver.executeScript('return window.localStorage["foods"]').then(function(storedFoods) {
      assert.equal(storedFoods, '[{"name":"apple","calories":"150"}]');
    });
  });
});

