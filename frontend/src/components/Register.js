// frontend/src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// MUI Imports
import { Avatar, Grid, Paper, Box, Typography, TextField, Button, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Register({ setToken }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        setError('');

        try {
            // Make the API call to your backend's registration route
                const res = await axios.post('https://task-manager-rvcm.onrender.com',{
                name,
                email,
                password,
            });

            // On success, save the token, update state, and redirect
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token);
            navigate('/'); // Redirect to the main tasks page

        } catch (err) {
            console.error(err.response.data);
            setError(err.response.data.msg || 'Registration failed. Please try again.');
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create an Account
                    </Typography>

                    {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="name" label="Full Name" name="name" autoComplete="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField margin="normal" required fullWidth name="password2" label="Confirm Password" type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Register
                        </Button>
                        <Button
                            fullWidth
                            variant="text"
                            component={RouterLink} // Use Link for navigation
                            to="/login"           // Set destination URL
                        >
                            Already have an account? Login
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Register;