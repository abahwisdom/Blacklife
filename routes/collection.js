const pool= require('../db');
const express= require('express');
const router= express.Router();
const { v4: uuidv4 } = require('uuid');

// create collection
// POST
router.post('/create', (req, res)=>{
    const {title, description}= req.body;
    pool.query('INSERT INTO collections (collection_uid, title, description) VALUES ($1, $2, $3)', [uuidv4(), title, description], (error, results) => {
        if (!title||!description){
            return res.status(400).json({msg:'Fill all fields'})
        }
        
        if (error) {
            if (error.code==23505) {
                console.log(error);
                return res.status(400).json({msg:'Title already in use'});
            }
            console.log(error);
            return res.status(400).json({msg:'Fill all fields'});
        }
        res.status(200).json({msg:'Collection Created'})
        
      })
})


// get collections
// GET
router.get('/all', (req, res)=>{
    pool.query('SELECT * FROM collections', (error, results) => {
        if (error) {
            console.log(error);
            return 
        }
        res.status(200).json(results.rows)
      })
})

// get single collection
// GET
router.get('/single/:uid', (req, res)=>{
    pool.query('SELECT * FROM collections WHERE title=$1',[req.params.uid], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({msg:'failed'});
        }
        res.status(200).json(results.rows[0])
      })
})

// edit collection
// PUT
router.put('/edit/:uid', (req, res)=>{
    const {title, description}= req.body;
    pool.query('UPDATE collections SET title = $1, description = $2 WHERE collection_uid = $3', [title, description, req.params.uid], (error, results) => {
        if (!title||!description){
            return res.status(400).json({msg:'Fill all fields'})
        }
       
        if (error) {
            if (error.code==23505) {
                console.log(error);
                return res.status(400).json({msg:'Name already in use'});
                
            }
            console.log(error);
            return res.status(400).json({msg:'failed'});

        }
        res.status(200).json({msg:'Update successful'})
      })
})

router.put('/edit-image/:uid', (req, res)=>{
    const {collection_image}= req.body;
    pool.query('UPDATE collections SET collection_image = $1 WHERE collection_uid = $2', [collection_image, req.params.uid], (error, results) => {
        if (!collection_image){
            return res.status(400).json({msg:'No image'})
        }
       
        if (error) {
            if (error.code==23505) {
                console.log(error);
                return res.status(400).json({msg:'Name already in use'});
                
            }
            console.log(error);
            return res.status(400).json({msg:'failed'});

        }
        res.status(200).json({msg:'Update successful'})
      })
})


// delete collection
// DELETE
router.delete('/delete/:uid', (req, res)=>{
    pool.query('DELETE FROM collections WHERE collection_uid = $1', [req.params.uid], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({msg:'failed'});           
        }
        res.status(200).json({msg:'Collection deleted'})
      })
})


module.exports= router