const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const auth= require('../middleware/auth');
const pool= require('../db');


//Sign in
//POST
router.post('/login', (req, res)=>{
    const {email, password}= req.body;
    if (!email|| !password) return res.status(400).json({msg: 'Fill all fields'})

    pool.query('SELECT * FROM users WHERE email=$1', [email], (error, results)=>{
        if (error){
            console.log(error);
            return
        };
        if (results.rowCount==0){
            return res.status(400).json({msg: 'User Does Not Exist'})
        }

        bcrypt.compare(password, results.rows[0].password)
        .then(isMatch=>{
            if (!isMatch) return res.status(400).json({msg: 'Invalid Credentials'})
            jwt.sign(
                {id: results.rows[0].user_uid},
                process.env.jwtSecret,
                {expiresIn: 86400},
                (err, token)=>{
                    if (err) {console.log(err); return };
                    res.json({
                        token,
                        user:{
                            id: results.rows[0].user_uid,
                            name: results.rows[0].name,
                            email:results.rows[0].email
                        }
                    })
                }
            )
        })
    })


    
});

//Get User details
//Get
router.get('/user', auth, (req, res)=>{
    pool.query('SELECT name, user_uid, email FROM users WHERE user_uid=$1', [req.user.id], (error, results)=>{
        if (error){
            console.log(error);
            return
        };
        if (results) res.status(200).json(results.rows[0])
    
    })
})
module.exports= router;