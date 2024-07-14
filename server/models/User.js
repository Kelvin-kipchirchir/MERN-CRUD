const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//list of columns for Employee schema
let UserSchema = new Schema({
    name: {
        type: String
    },
    
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: Number
    }
        //collection : 'employees'
});
module.exports = mongoose.model('User',UserSchema);