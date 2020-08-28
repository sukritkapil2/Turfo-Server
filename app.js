const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const userRoute = require("./api/routes/user");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//MongoDB Connection
mongoose.connect(
    "mongodb+srv://turfoadmin:" + process.env.MONGO_ATLAS_PWD + "@turfoserver.zucot.mongodb.net/turfo?authSource=admin&replicaSet=atlas-fjqfyf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    , (err) => {
        if (err) {
            console.log(err)
        }
        else console.log("Connected to MongoDB")
    }
)

//Route Handling
app.use("/user", userRoute);

//Handle Error
app.use((req, res, next) => {
    const error = new Error('Resource Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;