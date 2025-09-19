const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const Task = require('../models/Task');

// Create task
router.post('/', auth, async (req, res) => {
   
    const { title, description, completed } = req.body;

    try {
        const task = new Task({
            user: req.user._id,
            title,
            
            description: description || '', 
            completed: completed || false 
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        // ADD THIS CONSOLE.LOG TO SEE THE EXACT ERROR IN YOUR TERMINAL
        console.error(error); 
        res.status(500).json({ message: "Server error", error });
    }
});

// Get tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Update task
router.put('/:id', auth, async (req, res) => {
    try {
        // 1. Find the task belonging to the user
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Task not found or user not authorized" });
        }

        // 2. Manually flip the 'completed' status
        task.completed = !task.completed;

        // 3. Save the updated task
        await task.save();

        // 4. Send the updated task back to the frontend
        res.json(task);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
