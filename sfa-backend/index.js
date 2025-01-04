const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieparser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cors())
app.use(helmet())
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database is Connected");
    
})
.catch((err) => {
    console.log(err);
    
})


app.get('/', (req,res) => {
    res.json({ message: "Hello from the servers"})
})

app.listen(process.env.PORT, () => {
    console.log("Listening....");   
})