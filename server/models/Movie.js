const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//list of columns for Employee schema
let MovieSchema = new Schema({
    name: {
        type: String
    },
    
    photo: {
        type: String
    },
    ratings: {
        type: Number
    },
    likes: {
        type: Number
    },
    casts: {
        type: String
    },
    category: {
        type: String
    },
    description:{
        type: String
    },
    date:{
        type: Date
    }
        //collection : 'employees'
});
module.exports = mongoose.model('Movie',MovieSchema);