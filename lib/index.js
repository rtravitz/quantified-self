require("./css/materialize.css");
require("./materialize.js");
require("./css/main.css");

function addExercise() {
  var name = $('input[name="exercise-name"]').val();
  var calories = $('input[name="exercise-calories"]').val();
  
  addExerciseRow(name, calories);
}

function addExerciseRow(name, calories) {
  $('.table-block').append(
    '<tr><td>' + name + '</td><td>' + calories + '</td></tr>'
  );
}

$(document).ready(function() {
  $('.exercises-form').on('submit', addExercise); 
  $('form').on('submit', function(event) {
    event.preventDefault(); 
  });
});

