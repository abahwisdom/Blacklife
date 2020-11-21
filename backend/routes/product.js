const pool= require('../db');
const express= require('express');
const router= express.Router();
const { v4: uuidv4 } = require('uuid');

// create product
// POST
router.post('/create', (req, res)=>{
    const {
            name, 
            details,
            price,
            discount_price,
            collection_uid
        }= req.body;
    
    const id=uuidv4();

    pool.query('INSERT INTO products (product_uid, name, details, price, discount_price, collection_uid) VALUES ($1, $2, $3, $4, $5, $6)', [id, name, details, price, discount_price, collection_uid], (error, results) => {
        if (!name||!details||!price||!collection_uid){
            return res.status(400).json({msg:'Fill all fields'})
        }
        
        if (error) {
            if (error.code==23505) {
            res.status(400).json({msg:'Name already in use'});
        }
            console.log(error);
            return
        }
        res.status(200).json({msg:'Product Created', uid:id})
        
      })
})


// get products
// GET
router.get('/all', (req, res)=>{
    pool.query('SELECT * FROM products LEFT JOIN collections USING (collection_uid)', (error, results) => {
        if (error) {
          console.log(error);
          return
        }
        res.status(200).json(results.rows)
      })
})

// get products by collection
// GET
router.get('/by-collection/:uid', (req, res)=>{
    pool.query('SELECT * FROM products LEFT JOIN collections USING (collection_uid) WHERE title=$1',[req.params.uid], (error, results) => {
        if (error) {
            console.log(error); 
            return res.status(400).json({msg:'failed'});
            
        }
        res.status(200).json(results.rows)
      })
})

// get single productt

// GET
router.get('/single/:uid', (req, res)=>{
    pool.query('SELECT * FROM products LEFT JOIN collections USING (collection_uid) WHERE product_uid=$1',[req.params.uid], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({msg:'failed'});
        }
        if (results) res.status(200).json(results.rows[0])
      })
})

// edit product
// PUT
router.put('/edit/:uid', (req, res)=>{
    const {
        name, 
        details,
        price,
        discount_price,
        image_url,
        collection_uid
    }= req.body;
    pool.query('UPDATE products SET name=$1, details=$2, price=$3, discount_price=$4, image_url=$5, collection_uid=$6 WHERE product_uid = $7', [name, details, price, discount_price, image_url, collection_uid, req.params.uid], (error, results) => {
        if (!name||!details||!price||!image_url||!collection_uid){
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


// delete product
// DELETE
router.delete('/delete/:uid', (req, res)=>{
    pool.query('DELETE FROM products WHERE product_uid = $1', [req.params.uid], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({msg:'failed'});
            
        }
        res.status(200).json({msg:'Product deleted'})
      })
})


module.exports= router

