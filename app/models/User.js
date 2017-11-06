const mongoose = require('mongoose');
const {
    Schema
} = mongoose; //const Schema = mongoose.Schema; #Destructuring

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    google_id: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('users', userSchema);