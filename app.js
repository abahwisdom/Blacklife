const express= require('express');
require('dotenv').config();
const pool= require('./db');

pool.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
})

pool.on('connect', () => {
    console.log('connected to database');
    });

// import routes
const collection= require('./routes/collection');
const product= require('./routes/product');
const order= require('./routes/order');
const users= require('./routes/users');
const auth= require('./routes/auth');

const app= express();

// middleware
app.use(express.json());

// routes
app.use('/api/collection', collection );
app.use('/api/product', product );
app.use('/api/order', order );
app.use('/api/users', users );
app.use('/api/auth', auth );

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('../frontend/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend', 'build', 'index.html'))
    })
}


const PORT= process.env.PORT||5000
app.listen(PORT, ()=>{console.log('server running...')})