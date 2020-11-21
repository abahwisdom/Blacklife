const pool= require('../db');
const express= require('express');
const router= express.Router();
const { v4: uuidv4 } = require('uuid');

// create order and order group
// POST
router.post('/create', (req, res)=>{

    const {
        email, 
        order_list,
        address
    }= req.body;

    if (!order_list||!email||!address){
        return res.status(400).json({msg:'Fill all fieldss'})
    }

    const order_group_uid=uuidv4();

    pool.query('INSERT INTO order_groups (order_group_uid, email, date, address) VALUES ($1, $2, $3, $4)', [order_group_uid, email, new Date(), address], (error, results) => {
        if (!email){
            return res.status(400).json({msg:'Provide an email'})
        }
        
        if (error) {
            console.log(error);
            return
        }
      })

    order_list.map(order=>{
        pool.query('INSERT INTO orders(order_uid, order_group_uid, product_uid, selling_price, count, total_price) VALUES ($1, $2, $3, $4, $5, $6 )', [uuidv4(), order_group_uid, order.product_uid, order.discount_price?order.discount_price:order.price, order.count, order.count*(order.discount_price?order.discount_price:order.price) ], (error, results)=>{
            if (!order.product_uid||!order.count){
                return res.status(400).json({msg:'Fill all fields'})
            }
        })
    })

    res.status(200).json({order_id:order_group_uid})

})


// get orders
// GET
router.get('/get/:uid', (req, res)=>{
    pool.query('SELECT * FROM orders LEFT JOIN order_groups USING (order_group_uid) LEFT JOIN products USING (product_uid) WHERE order_group_uid=$1',[req.params.uid], (error, results) => {
        if (error) {
            console.log(error); 
            return res.status(400).json({msg:'failed'});
            
        }
        res.status(200).json(results.rows)
      })
})



// delete order
// DELETE
router.delete('/delete/:uid', (req, res)=>{
    pool.query('DELETE FROM orders WHERE order_group_uid = $1', [req.params.uid], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({msg:'failed'});
            
        }
    })

    pool.query('DELETE FROM order_groups WHERE order_group_uid = $1', [req.params.uid], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({msg:'failed'});
            
        }
    })


    res.status(200).json({msg:'Product deleted'})
})


module.exports= router