require("./css/materialize.css");
require("./materialize.js");
require("./css/main.css");

function addRow(name, calories, type) {
  $(type).append(
    '<tr><td>' + name + '</td><td>' + calories + '</td></tr>'
  );
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
  $('.exercises-form').on('submit', addExercise); 
  $('form').on('submit', function(event) {
    event.preventDefault(); 
  });
});

