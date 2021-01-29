import React, { useState } from 'react';
import { TextValidator } from 'react-material-ui-form-validator'

//Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
export const AddTask = props => {

    const [newTaskName, setNewTaskName] = useState('')

    const updateNewTaskValue = e => setNewTaskName(e.target.value);

    const creatNewTask = () => {
        props.callback(newTaskName);
        setNewTaskName('');
    };
    
    return (
        <div className="my-1">
            <TextField
                variant="outlined"
                label="Add a Task"
                type="text"
                multiline
                rowsMax={10}
                className="form-controll col-9"
                value={newTaskName}
                onChange={updateNewTaskValue}
                required
            />
            <Button color="primary" className="mt-2" onClick={creatNewTask}>
                Add
            </Button>
        </div>
    );
}