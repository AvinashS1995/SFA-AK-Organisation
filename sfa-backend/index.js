const express = require('express');
const cors = require('cors');
// const helmet = require('helmet');
// const cookieparser = require('cookie-parser');
// const mongoose = require('mongoose');
const fs = require('fs');
const crypto = require('crypto')
const { jwtAuthMiddleware, generateToken } = require('./routes/jwt')


const app = express();

app.use(cors())
// app.use(helmet())
// app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// mongoose.connect('mongodb://localhost:27017/').then(() => {
//     console.log("Database is Connected");
    
// })
// .catch((err) => {
//     console.log(err);
    
// })


app.get('/', (req,res) => {
    res.json({ message: "Hello from the servers"})
})

const filePath = './data.json'

// app.use(jwtAuthMiddleware)

// Login API
app.post('/authenticateUser/login', (req, res) => {
    const responseData = {
        responseCode: '01',
        message: 'User not found',
        timestamp: new Date().toISOString()
    };

    fs.readFile(filePath, 'utf8', (err, data)=>{
        if(err){
            responseData.responseCode = '02'
            responseData.message = 'Error in file reading'
            return res.json(responseData)
        }
        try{

            const array = JSON.parse(data);
            const exists = array.some(user => user.username === req.body.username && user.password === req.body.password)
            if(!exists){
                responseData.responseCode = '01'
                responseData.message = 'User not fount'
                return res.json(responseData)
            }else{
                let token = generateToken(req.body);
                responseData.token = token
                responseData.responseCode = '00'
                responseData.message = 'Your are successfully Logged in'
                return res.json(responseData)
            }

        }catch(parseError) {
            console.log('Error parsing JSON: ', parseError);
            responseData.responseCode = '02'
            responseData.message = 'Error in parsing JSON'
            res.json(responseData)
        }
    })


})

// app.listen(process.env.PORT, () => {
//     console.log("Listening....");   
// })

app.post('/authenticateUser/signup', (req, res) => {
    const responseData = {
        responseCode: '',
        message: '',
        timestamp: new Date().toISOString()
    }

    fs.readFile (filePath, 'utf8', (err, data) => {
        if(err){
            responseData.responseCode = '02'
            responseData.message = 'Error in reading file'
            res.json(responseData)
            return console.log('Error reading file', err);
            
        }
        try {
            const array = JSON.parse(data)
            const exists = array.some(
                (user) => user.username === req.body.username
            )
            if(!exists){
                let id = array.length + 1;
                req.body.id = id;
                array.push(req.body);

                fs.writeFile(filePath, JSON.stringify(array, null, 2), (err) => {
                    if(err){
                        console.error('Error writing to file:', err);
                    }else{
                        let token = generateToken(req.body)
                        console.log('token', token);
                        responseData.token = token

                        console.log('Object added and file updated successfully!');
                        responseData.responseCode = '00'
                        responseData.message = 'User Registered Successfully'
                        res.json(responseData)
                    }
                })
            }else{
                console.log('Object already exists in the array. No changes made.');
                responseData.responseCode = '01'
                responseData.message = 'User Allready Exists'
                res.json(responseData)
            }

        } catch(parseError) {
            console.log('Error parsing JSON: ', parseError);
            responseData.responseCode = '02'
            responseData.message = 'Error in parsing JSON'
            res.json(responseData)
        }
    })

})

app.listen(3000,() => {
    console.log(`API is running at http://localhost:3000`); 
})