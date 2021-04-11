const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { WorkoutModel } = require("../models");

// router.get('/practice', validateJWT, (req, res) => {
//     res.send('Hey!! This is a practice route!')
// });


// Create a workout log
router.post('/', validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.workout;
    const { id } = req.user;
    const workoutEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try{
        const newWorkout = await WorkoutModel.create(workoutEntry);
        res.status(200).json(newWorkout);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    WorkoutModel.create(workoutEntry)
});
// Get logs for an individual user
router.get("/", async (req, res) => {

    try{
        const entries = await WorkoutModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})
// Get logs by ID
router.get("/:id", validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userWorkouts = await WorkoutModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userWorkouts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:routine", async (req, res) => {
    const { description } = req.params;
    try {
        const results = await WorkoutModel.findAll({
            where: { description: description }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err })
    }
})
// Update a post
router.put("/:id", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.workout;
    const workoutId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: workoutId,
            owner_id:userId
        }
    };

    const updatedWorkout = {
        description: description,
        definition: definition,
        result: result
    };

    try {
        const update = await WorkoutModel.update(updatedWorkout, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({ error: err });
    }
});
// Delete a post
router.delete("/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const workoutId = req.params.id;

    try{
        const query = {
            where: {
                id: workoutId,
                owner: ownerId
            }
        };
        await WorkoutModel.destroy(query);
        res.status(200).json({ error: err });
    } catch (err) {
        res.status(500).json({ error: err })
    }
})



router.get('/about', (req, res) => {
    res.send('This is the about me section')
});

module.exports = router;