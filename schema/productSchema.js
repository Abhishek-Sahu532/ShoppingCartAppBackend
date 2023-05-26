const mongoose = require('mongoose');


const product = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    productImage:{
        type: String
    },
    date:{
        type: String
    },
    brand:{
        type: String
    },
    cost:{
        type: Number
    }

})


module.exports = mongoose.model('productSchema', product)