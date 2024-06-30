import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Switch from '@mui/material/Switch';



const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
    const [taskTodo, setTaskTodo] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(true);


    // add example task "cleaning" with task_id = 42 to the list


    let handleSubmit = () => {
        if (taskTodo === '') {
            alert('Task cannot be empty');
            return;
        } else if (todoList.length >= 10) {
            alert('Task list is full');
            return;
        }
        setTodoList([...todoList, { id: uuidv4(), text: taskTodo, checked: false }]);
        setTaskTodo('');
    };

    const deleteTask = (id) => () => {
        const newTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(newTodoList);
    }

    const handleCheck = (id) => () => {
        const newTodoList = todoList.map((todo) => {
            if (todo.id === id) {
                return { ...todo, checked: !todo.checked };
            }
            return todo;
        });
        setTodoList(newTodoList);
    }

    const sortTodoList = () => {
        todoList.sort((a, b) => {
            if (a.checked && !b.checked) {
                return 1;
            }
            if (!a.checked && b.checked) {
                return -1;
            }
            return 0;
        });

        // rerender 
        setTodoList([...todoList]);
    }


    const handleThemeChange = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };



    return (
        <Grid container justify="center" alignItems="center">
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <Box position="fixed" top={20} right={20} zIndex={1000}>
                    <Switch onChange={handleThemeChange} checked={isDarkMode} />
                </Box>
                <Container style={{ marginTop: '50px' }} display={'flex'} max-width='md'>
                    <CssBaseline />
                    <Typography variant="h2" component="h2" align="center" mb={'20px'}>
                        Tree Do App!
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Enter task"
                            variant="outlined"
                            value={taskTodo}
                            onChange={(e) => setTaskTodo(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Add Task
                        </Button>
                        {/* <Typography variant="body1" component="p">
                            Add Task: {taskTodo}
                        </Typography> */}
                    </Box>
                    <List>
                        {todoList.length === 0 && <Typography variant="body1" component="p">No tasks</Typography>}
                        {todoList.map((todo) => (
                            <ListItem key={todo.id}>
                                <Checkbox onClick={handleCheck(todo.id)} checked={todo.checked}></Checkbox>
                                <ListItemText
                                    primary={todo.text}
                                    secondary={todo.id}
                                    style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}
                                />
                                <Button variant="contained" color="secondary" onClick={deleteTask(todo.id)}>
                                    Delete
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                    <Button variant="contained" color="secondary" onClick={() => sortTodoList()}>Sort List!</Button>
                </Container >
                {/* {!isDarkMode && (
                    <img
                        src="/surprisedCat.jpeg"
                        alt="surprised cat"
                    />
                )} */}
            </ThemeProvider >
        </Grid>
    );

}


export default App;
