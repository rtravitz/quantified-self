require("./css/materialize.css");
require("./materialize.js");
require("./css/main.css");

function addRow(name, calories, type) {
  $(type).append(
    '<tr><td>' + name + '</td><td>' + calories + '</td></tr>'
  );
}

function addFood() {
  var name = $('input[name="food-name"]').val();
  var calories = $('input[name="food-calories"]').val();
  
  storeFood(name, calories);
  addRow(name, calories, '.food-table');
}

function storeFood(name, calories) {
  var foodJSON = localStorage.getItem('foods');
  if (foodJSON === null) {
    foodJSON = '[]';
  }
  var foods = JSON.parse(foodJSON);
  foods.push({name: name, calories: calories});
  foodJSON = JSON.stringify(foods);
  localStorage.setItem('foods', foodJSON);
}

function loadFoods() {
  var foods = localStorage.getItem('foods');
  if (foods !== null) {
    var foodJSON = JSON.parse(foods);
    for (var i = 0; i < foodJSON.length; i++) {
      addRow(foodJSON[i].name, foodJSON[i].calories, '.food-table');
    }
  }
}

function addExercise() {
  var name = $('input[name="exercise-name"]').val();
  var calories = $('input[name="exercise-calories"]').val();
  
  storeExercise(name, calories);
  addRow(name, calories, '.exercise-table');
}

function storeExercise(name, calories) {
  var exerciseJSON = localStorage.getItem('exercises');
  if (exerciseJSON === null) {
    exerciseJSON = '[]';
  }
  var exercises = JSON.parse(exerciseJSON);
  exercises.push({name: name, calories: calories});
  exerciseJSON = JSON.stringify(exercises);
  localStorage.setItem('exercises', exerciseJSON);
}

function loadExercises() {
  var exercises = localStorage.getItem('exercises');
  if (exercises !== null) {
    var exerciseJSON = JSON.parse(exercises);
    for (var i = 0; i < exerciseJSON.length; i++) {
      addRow(exerciseJSON[i].name, exerciseJSON[i].calories, '.exercise-table');
    }
  }
}

$(document).ready(function() {
  loadExercises();
  loadFoods();
  $('.exercises-form').on('submit', addExercise); 
  $('.foods-form').on('submit', addFood);
  $('form').on('submit', function(event) {
    event.preventDefault(); 
  });
});

