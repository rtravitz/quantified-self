function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

Food.prototype.store = function() {
  foods = getLocalFoods();
  foods.push({name: this.name, calories: this.calories});
  setLocalFoods(foods);
}

Food.prototype.remove = function() {
  foods = getLocalFoods();
  var idx;
  for (var i = 0; i < foods.length; i++) {
    if (foods[i].name === this.name) {
      idx = i
    }
  }
  foods.splice(idx, 1);
  setLocalFoods(foods);
}

function getLocalFoods() {
  var foodJSON = localStorage.getItem('foods');
  if (foodJSON === null) {
    foodJSON = '[]';
  }
  return JSON.parse(foodJSON);
}

function setLocalFoods(foods) {
  foodJSON = JSON.stringify(foods);
  localStorage.setItem('foods', foodJSON);
}

module.exports = Food;
