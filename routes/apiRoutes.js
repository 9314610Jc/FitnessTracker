const router = require("express").Router();

module.exports = db => {
  const WorkoutController = require("../controllers/workoutController.js")(db);

  router.get("/workouts", WorkoutController.getWorkouts);
  router.get("/workouts/range", WorkoutController.getWorkoutsInRange);
  router.post("/workouts", WorkoutController.createWorkout);
  router.put("/workouts/:id", WorkoutController.addExercise);

  return router;
}