module.exports = db => {
    return {
 //get workoutrs and aggregrate
      getWorkouts: (req, res) => {
        db.Workout.aggregate([
          {
            $sort: { day: 1 }
          },
          {
            $addFields: {
              totalDuration: {
                $sum: ["$exercises.duration"]
              }
            }
          }
        ])
          .then(data => {
            res.json(data);
          })
          .catch(err => {
            console.log(err);
            res.status(500).end();
          });
      },
      //create
      createWorkout: (req, res) => {
        db.Workout.create(
          {
            day: Date.now(),
            exercises: []
          })
          .then(data => res.json(data))
          .catch(err => {
            console.log(err);
            res.status(500).end();
          });
      },
      //add 
      addExercise: (req, res) => {
        db.Workout.update(
          {
            "_id": req.params.id
          },
          {
            $push: {
              exercises: req.body
            }
          }
        )
          .then(data => res.json(data))
          .catch(err => {
            console.log(err);
            res.status(500).end();
          });
      },
      getWorkoutsInRange: (req, res) => {
        db.Workout.aggregate([
          {
            $sort: { day: -1 },
          },
          {
            $limit: 7
          },
          {
            $sort: { day: 1 },
          },
          {
            $addFields: {
              totalDuration: {
                $sum: ["$exercises.duration"]
              }
            }
          }
        ])
          .then(data => {
            res.json(data);
          })
          .catch(err => {
            console.log(err);
            res.status(500).end();
          });
      }
    }
  };