const mongoose = require('mongoose');
const {
  Schema
} = mongoose; //const Schema = mongoose.Schema; #Destructuring

const userSchema = new Schema({
  id: [Number],
  google_user_id: String,
  google_user_token: String,
  fullname: String,
  email: String,
  password: String,
  created_on: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('users', userSchema);
