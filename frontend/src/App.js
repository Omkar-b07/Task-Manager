// frontend/src/App.js

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link as RouterLink } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Task';
import AddTask from './components/AddTask';

// MUI Imports
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import theme from './theme';

// A component for the main authenticated view
function TaskPage({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  
  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  return (
    <>
      <AddTask token={token} onTaskAdded={handleTaskAdded} />
      <Tasks token={token} initialTasks={tasks} setTasks={setTasks} />
    </>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // This effect will run when the component mounts and whenever the token state changes.
    // It keeps localStorage in sync with the component's state.
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
            {token && (
               <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{ 
                    color: '#ff4d4d', // Red color for the text
                    fontWeight: 'bold',
                    '&:hover': { // Styles for when the mouse hovers
                        backgroundColor: 'rgba(255, 77, 77, 0.1)',
                    }
                }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Container component="main" sx={{ mt: 4 }}>
          <Routes>
            <Route 
              path="/" 
              element={
                token ? <TaskPage token={token} onLogout={handleLogout} /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/login" 
              element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />}
            />
            <Route 
              path="/register" 
              element={!token ? <Register setToken={setToken} /> : <Navigate to="/" />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;