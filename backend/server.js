const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//Routes for express
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");

// Express app
const app = express();


// Middleware
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MongoURL)
.then(() => {
    // Listen to requests
    app.listen(process.env.PORT , ()=>{
        console.log('ConnectED to DB & listening on port 4000');
    })
})
.catch((error) => { console.error(error);});


//Routes
app.use((req , res , next)=>{
    console.log(req.path , req.method)
    next();
});


app.get('/', (req, res) =>res.json({mssg:"Hello"}));

app.use('/posts/',postRoutes);
app.use('/likes/',likeRoutes);