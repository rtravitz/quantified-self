require("./css/materialize.css");
require("./materialize.js");
require("./css/main.css");
var Food = require("./food");
var Exercise = require("./exercise");

function addFoodRow(name, calories) {
  $('.food-table tr:first').after(
    '<tr id="' + name + '-row"><td class="name-cell">' + name + 
    '</td><td class="calories-cell">' + calories + '</td><td><a href="#" id="' +
    name + '" class="food-delete-btn">X</a></tr>'
  );
}

function addExerciseRow(name, calories) {
  $('.exercise-table tr:first').after(
    '<tr id="' + name + '-row"><td class="name-cell">' + name + 
    '</td><td class="calories-cell">' + calories + '</td><td><a href="#" id="' +
    name + '" class="exercise-delete-btn">X</a></tr>'
  );
}

function deleteFood() {
  var name = event.target.id;
  var selector = "#" + name + "-row";
  food = new Food(name);
  food.remove();
  $(selector).remove();
}

function deleteExercise() {
  var name = event.target.id;
  var selector = "#" + name + "-row";
  exercise = new Exercise(name);
  exercise.remove();
  $(selector).remove();
}

function addFood() {
  var food = new Food($('input[name="name"]').val(),
    $('input[name="calories"]').val());
  
  if (food.name === "") {
    $('input[name="name"]')
      .after('<p class="name-err">Please enter a food name.</p>')
  } else {
    food.store();
    addFoodRow(name, calories);
  }
}

function loadFoods() {
  var foods = localStorage.getItem('foods');
  if (foods !== null) {
    var foodJSON = JSON.parse(foods);
    for (var i = 0; i < foodJSON.length; i++) {
      addFoodRow(foodJSON[i].name, foodJSON[i].calories);
    }
  }
}

function addExercise() {
  var name = $('input[name="name"]').val();
  var calories = $('input[name="calories"]').val();
  var exercise = new Exercise(name, calories);
  
  exercise.store();
  addExerciseRow(name, calories);
}

function loadExercises() {
  var exercises = localStorage.getItem('exercises');
  if (exercises !== null) {
    var exerciseJSON = JSON.parse(exercises);
    for (var i = 0; i < exerciseJSON.length; i++) {
      addExerciseRow(exerciseJSON[i].name, exerciseJSON[i].calories);
    }
  }
}

$(document).ready(function() {
  loadExercises();
  loadFoods();
  $('.food-delete-btn').on('click', deleteFood);
  $('.exercise-delete-btn').on('click', deleteExercise);
  $('.exercises-form').on('submit', addExercise); 
  $('.foods-form').on('submit', addFood);
  $('form').on('submit', function(event) {
    event.preventDefault(); 
  });
});

