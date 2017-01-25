function Exercise(name, calories) {
  this.name = name;
  this.calories = calories;
}

Exercise.prototype.store = function () {
  var exercises = getLocalExercises();
  exercises.push({name: this.name, calories: this.calories});
  setLocalExercises(exercises);
}

Exercise.prototype.remove = function() {
  exercises = getLocalExercises();
  var idx;
  for (var i = 0; i < exercises.length; i++) {
    if (exercises[i].name === this.name) {
      idx = i;
    }
  }
  exercises.splice(idx, 1);
  setLocalExercises(exercises);
}

function getLocalExercises() {
  var exerciseJSON = localStorage.getItem('exercises');
  if (exerciseJSON === null) {
    exerciseJSON = '[]';
  }
  return JSON.parse(exerciseJSON);
}

function setLocalExercises(exercises) {
  exerciseJSON = JSON.stringify(exercises);
  localStorage.setItem('exercises', exerciseJSON);
}

module.exports = Exercise;
