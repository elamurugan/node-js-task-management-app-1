const mongoose = require('mongoose');
const {
  Schema
} = mongoose; //const Schema = mongoose.Schema; #Destructuring

const tasksSchema = new Schema({
  id: [Number],
  task_id: String,
  name: String,
  description: String,
  status: {
    type: String,
    default: 'Pending'
  },
  created_by: [Number],
  assigned_to: [Number],
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: [Date],
  created_on: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('tasks', tasksSchema);
