require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");

app.use(Express.json()); 

app.use("/user", controllers.userController);

app.use(require("./middleware/validate-jwt"));
app.use("/log", controllers.workoutController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(6000, () => {
            console.log(`[Server]: App is listening on 6000.`);
        });
    })

    .catch((err) => {
        console.log(`[Server]: crashed. Error = ${err}`);
    });

// app.listen(5000, () => {
//     console.log(`[Server]: App is listening on 5000`);
// });

app.use('/test', (req, res) => {
    res.send('This is message from the test endpoint on the server')
});

// app.use('/user', (req, res) => {
//     res.send('This is message from the user page')
// });