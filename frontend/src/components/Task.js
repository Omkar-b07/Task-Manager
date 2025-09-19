import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Material-UI Imports
import { List, ListItem, ListItemText, Checkbox, IconButton, Typography, Box, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Tasks({ token, initialTasks, setTasks }) {
    // Note: We are now passing 'setTasks' from App.js to keep state consistent
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setError(null);
                    const res = await axios.post('https://task-manager-rvcm.onrender.com', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setTasks(res.data);
            } catch (err) {
                console.error('Failed to fetch tasks:', err);
                setError('Failed to load tasks. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchTasks();
        }
    }, [token, setTasks]);


    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
        } catch (err) {
            setError('Could not delete the task. Please try again.');
        }
    };

    const handleToggleComplete = async (taskId) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, null, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === taskId ? { ...task, completed: res.data.completed } : task
                )
            );
        } catch (err) {
            setError('Could not update task.');
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Tasks List
            </Typography>

            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

            {initialTasks.length > 0 ? (
                <List>
                    {initialTasks.map(task => (
                        <ListItem
                            key={task._id}
                            sx={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                                opacity: task.completed ? 0.6 : 1,
                                bgcolor: 'background.paper',
                                mb: 1,
                                borderRadius: 1
                            }}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task._id)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <Checkbox
                                checked={task.completed}
                                onChange={() => handleToggleComplete(task._id)}
                                color="primary"
                            />
                            <ListItemText 
                                primary={task.title} 
                                secondary={task.completed ? 'Completed' : 'Pending'} 
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                !error && <Typography>You have no tasks.</Typography>
            )}
        </Box>
    );
}

export default Tasks;