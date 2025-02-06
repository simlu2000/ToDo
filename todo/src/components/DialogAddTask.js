import React from 'react';
import { useState } from 'react';
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

function DialogAddTask({ open, onClose }) {
    const [taskDate, setTaskDate] = useState(dayjs());
    const [taskCategory, setTaskCategory] = useState("");
    const categories = ["Work", "Personal", "Shopping", "Study", "Health", "Other"];
    const handleSelectCategory = (category) => {
        setTaskCategory(category);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="md" //available options: xs, sm, md, lg, xl
                sx={{
                    '& .MuiDialog-paper': {  //style for dialog wrap
                        width: '800px',
                        height: '600px',
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
                        variant="outlined">
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
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>

    )
}

export default DialogAddTask;
