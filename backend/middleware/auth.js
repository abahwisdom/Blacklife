const jwt= require('jsonwebtoken');

function auth(req, res, next){
    const token= req.header('black-life-auth-token');

    if (!token) return res.status(401).json({msg: 'No token, auth denied'});

    try {
        const decoded= jwt.verify(token, process.env.jwtSecret);

        req.user=decoded;
        next()
        
    } catch (error) {
        res.status(400).json({msg: 'Token invalid, auth denied'});
    }
}

module.exports=auth;