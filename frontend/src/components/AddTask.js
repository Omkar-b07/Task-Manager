import React, { useState } from 'react';
import axios from 'axios';

import { TextField, Button, Box } from '@mui/material';

const AddTask = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) {
            alert('Please enter a task title');
            return;
        }

        try {
            const token = localStorage.getItem('token');
             console.log('Token being sent:', token);
            const res = await axios.post('http://localhost:5000/api/tasks', 
                { title }, // The data to send
                { 
                    headers: { 'Authorization': `Bearer ${token}` } 
                }
            );
            
            onTaskAdded(res.data); // Pass the new task up to the parent
            setTitle(''); // Clear the input field
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', alignItems: 'center', mb: 4 }} // mb: 4 adds a margin-bottom
        >
            <TextField
                label="Add a new task"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ ml: 2, py: 1 }} // ml: 2 is margin-left, py: 1 is padding on y-axis
            >
                Add Task
            </Button>
        </Box>
    );
};

export default AddTask;