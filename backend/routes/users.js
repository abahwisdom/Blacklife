const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const pool= require('../db');
const { v4: uuidv4 } = require('uuid');



//Create Account
//POST
router.post('/register', (req, res)=>{
    const {name, email, password}= req.body;
    if (!name|| !email|| !password) return res.status(400).json({msg: 'Please Fill All Fields'});
    const user_uid=uuidv4();

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, (err, hash)=>{
            if (err) {console.log(err); return};
            
            pool.query('INSERT INTO users (user_uid, name, email, password) VALUES ($1, $2, $3, $4)', [user_uid, name, email, hash], (error, results) => {
        
                if (error) {
                    if (error.code==23505) {
                        res.status(400).json({msg:'Email already in use'});
                    }
                    console.log(error);
                    return
                }

                jwt.sign(
                    {id: user_uid},
                    process.env.jwtSecret,
                    {expiresIn: 86400},
                    (err, token)=>{
                        if (err) {console.log(err); return};
                        res.json({
                            token,
                            user:{
                                id: user_uid,
                                name: name,
                                email:email
                            }
                        })
                    }
                )
              })

        })
    })

    
});

//Display Profile
//GET
router.get('/:uid', (req, res)=>{
    pool.query('SELECT name, user_uid, email FROM users WHERE user_uid=$1', [req.params.uid], (error, results)=>{
        if (error){
            console.log(error);
            return
        };
        if (results) res.status(200).json(results.rows[0])
    })
});

// // //Display all users
// // //GET
// // router.get('/', (req, res)=>{
// //     User.find()
// //     .then((user)=>{res.json(user)})
// //     .catch((err)=>{res.status(400).json({"error": err})});
// // });



// // //Display Profile by email
// // //GET
// // router.get('/email/:mail', (req, res)=>{
// //     User.find({email:req.params.mail})
// //     .then((user)=>{if (user) res.json(user)})
// //     .catch((err)=>{res.status(400).json({"error": err})});
// // });

// // //Edit Profile
// // //PUT
// // router.put('/:id', (req, res)=>{
// //     User.findById(req.params.id)
// //     .then((user)=>{
// //         // user.username=req.body.username||user.username;
// //         user.email= req.body.email||user.email;
// //         // user.UID= req.body.UID||user.UID;
// //         user.name= req.body.name||user.name;
// //         // user.age= req.body.age||user.age;
// //         user.save()
// //         .then((user)=>{res.json(user)}).catch((err)=>{res.status(400).json(err.message)});
// //     })
// //     .catch((err)=>{res.status(400).json("No user with id")});
// // });

// // //Delete Account
// // //DELETE
// // router.delete('/:id', (req, res)=>{
// //     User.findById(req.params.id)
// //     .then((user)=>{
// //         user.remove()
// //         .then((user)=>{res.json('user removed')}).catch((err)=>{res.status(400).json(err.message)});
// //     })
// //     .catch((err)=>{res.status(400).json("No user with id")});

    
// // });



module.exports= router;