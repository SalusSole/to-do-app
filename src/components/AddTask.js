import React, { useState } from 'react';

export const AddTask = props => {

    const [newTaskName, setNewTaskName] = useState('')

    const updateNewTaskValue = e => setNewTaskName(e.target.value);

    const creatNewTask = () => {
        props.callback(newTaskName);
        setNewTaskName('');
    }

    return (
        <div className="my-1">
            <input
                type="text"
                className="form-controll"
                value={newTaskName}
                onChange={updateNewTaskValue}
            />
            <button className="btn btn-primary mt-1" onClick={creatNewTask}>
                Add
            </button>
        </div>
    )
}