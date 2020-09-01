const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
 
const User = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    Desk: [{
        type: Schema.Types.ObjectId,
        ref: 'Desks',
    }],
    date: { type: Date, default: Date.now },
});

User.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password , salt);
    this.password = hash;
    next();
})

User.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
}

module.exports = mongoose.model('User', User);