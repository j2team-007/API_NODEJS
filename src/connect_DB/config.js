const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const database = async function () {
    try {
        await mongoose.connect(process.env.DB_LOCAlHOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database is successful!');
    } catch (e) {
        console.log('Connecting Database is Fail!')
    }
}

module.exports = { database };