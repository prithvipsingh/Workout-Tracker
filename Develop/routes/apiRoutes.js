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
})
}