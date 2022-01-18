//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


//routes
const recipeRouter = require("./routes/recipe_route");

//invoke an express app
const app = express();

require("dotenv").config();
app.use(express.json({ limit: "50mb" }));

app.use(cors());


//routes middleware
app.use("/recipe", recipeRouter);


//configuring dotenv variables
const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI;

//creating express server
app.listen(PORT, async () => {

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,            
        });

        console.log("MonoDB successfully connected 🔥🟢");

    } catch (error) {
        console.log("MongoDB connection err ", error);
    }

    console.log(`Express server running at PORT ${PORT} 😍`);
});
