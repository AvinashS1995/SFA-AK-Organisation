const jwt = require('jsonwebtoken');
// const jwtSecretKey = crypto.randomBytes(64).toString('hex');
const jwtSecretKey = 'b37e41c5b1e8b98f1bf99767a7c99136c759be76d4808267c7969a8c0a838c1b4c17c5e46c2dfe1ac920780372149d7cee939e2342dbc94922e665b990aacc1d'

// middleware
const jwtAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try{

        const decoded = jwt.verify(token, jwtSecretKey)
        req.user = decoded;

    }catch (err){

        console.log(err);
        res.status(401).json({error: 'Invalid token'});

    }
    
}

// function
const generateToken = (userData) => {
    return jwt.sign(userData, jwtSecretKey)
}

module.exports = { jwtAuthMiddleware, generateToken }