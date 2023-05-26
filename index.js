const express = require('express');
const app = express();
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const PORT = 4000;
const DATABASE_URL = `mongodb+srv://asahu532:abhishek1@cluster0.xo6px0o.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('err',(err)=>{console.log(err)});
db.once('open',()=>{console.log('Connected to the database')})

app.use('/api/v1', productRoutes)

app.listen(PORT, ()=>{
    console.log('App is running on port ', PORT)
})

