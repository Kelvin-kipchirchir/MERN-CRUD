const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//list of columns for Employee schema
let StudentSchema = new Schema({
    name: {
        type: String
    },
    
    email: {
        type: String
    },
    phone: {
        type: Number
    }
        //collection : 'employees'
});
module.exports = mongoose.model('Student',StudentSchema);