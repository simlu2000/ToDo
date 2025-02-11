import React from 'react';
import { useState, useEffect } from 'react';
import {
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function DialogAddTask({ open, onClose, addTask }) {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDate, setTaskDate] = useState(dayjs());
    const [taskCategory, setTaskCategory] = useState("");
    const categories = ["Work", "Personal", "Shopping", "Study", "Health", "Other"];
    const handleSelectCategory = (category) => {
        setTaskCategory(category);
    }

    const handleAddTask = () => {
        if (taskTitle && taskDate && taskCategory) {
            const newTask = { title: taskTitle, date: taskDate, category: taskCategory };
            console.log(newTask);
            addTask(newTask);
            setTaskTitle('');
            setTaskDate(dayjs());
            setTaskCategory('');
            onClose();
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="md" //available options: xs, sm, md, lg, xl
                sx={{
                    '& .MuiDialog-paper': {  //style for dialog wrap
                        width: 'auto',
                        height: 'auto',
                        borderRadius: '25px'
                    }
                }}>
                <DialogTitle>
                    <Typography variant='h4'>
                        Add a Task
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="taskTitle"
                        label="Task"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setTaskTitle(e.target.value)}>
                    </TextField>
                    <DatePicker
                        label="Select the date"
                        value={taskDate}
                        sx={{ marginTop: '5%' }}
                        onChange={(newDate) => setTaskDate(newDate)}
                        renderInput={(params) => <TextField {...params} fullWidth
                            margin="dense"
                            variant="outlined" />}
                    />
                    <List>
                        {categories.map((category) => (
                            <React.Fragment key={category}>
                                <ListItem button onClick={() => handleSelectCategory(category)}>
                                    <ListItemText primary={category} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} sx={{ color: "#34B3DB" }}>Cancel</Button>
                    <Button onClick={handleAddTask} sx={{ color: "#FCFCFC", backgroundColor: "#34B3DB", marginRight: "4%", borderRadius: '25px' }}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>

    )
}

export default DialogAddTask;
