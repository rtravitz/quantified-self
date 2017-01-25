function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

Food.prototype.store = function() {
  var foodJSON = localStorage.getItem('foods');
  if (foodJSON === null) {
    foodJSON = '[]';
  }
  var foods = JSON.parse(foodJSON);
  foods.push({name: this.name, calories: this.calories});
  foodJSON = JSON.stringify(foods);
  localStorage.setItem('foods', foodJSON);
}

module.exports = Food;
