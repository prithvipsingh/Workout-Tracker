var db = require("../models");

module.exports = function(app){

 // Getting last workout using api.js 
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.json(err);
    });
    });

  // Creating a new Workout in the Database 

    app.post("/api/workouts", async (req, res)=> {
    try{
        const response = await db.Workout.create({type: "workout"})
        res.json(response);
    }
    catch(err){
        console.log("error occurred creating a workout: ", err)
    }
    });

    // Creates a new workout in the workout database
    app.post("/api/workouts", async (req, res)=> {
        try{
            const response = await db.Workout.create({type: "workout"})
            res.json(response);
        }
        catch(err){
            console.log("error occurred creating a workout: ", err)
        }
    })

    // Used by api.js to add an exercise to a workout
    app.put("/api/workouts/:id", ({body, params}, res) => {
        // console.log(body, params)
        const workoutId = params.id;
        let savedExercises = [];

        // gets all the currently saved exercises in the current workout
        db.Workout.find({_id: workoutId})
            .then(dbWorkout => {
                // console.log(dbWorkout)
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                console.log(allExercises)
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises){
            db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function(err, doc){
            if(err){
                console.log(err)
            }

            })
        }
            
    })
    // DELETE WORKOUT
    app.delete("/api/workouts/:id", ({params}, res) => {
        const workoutId = params.id;
        // removing data from db
        db.Workout.remove({_id: workoutId})
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                res.json(err);
            });
    })

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    }); 
};