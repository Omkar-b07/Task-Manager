// File Path: backend/models/Task.js

const mongoose = require('mongoose');

// 1. Define the Schema (the structure of the document)
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    // Optional: This links the task to a specific user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    }
});

// 2. Create the Model from the Schema
const Task = mongoose.model('Task', taskSchema);

// 3. Export the Model
module.exports = Task;