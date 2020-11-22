const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        index: true, 
        unique: true,
        require: true
    },
    year:{
        type: Number,
        min : 1990,
        max : 2020,
        require: true
    },
    director: {
        type: String,
        require: true
    },  
})
mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('Movie', movieSchema);