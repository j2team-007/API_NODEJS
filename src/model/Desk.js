const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const Desks = new Schema({
    total: { type: Number, default: 0 },
    keyword: String,
    description: String,
    owner: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Desks', Desks);