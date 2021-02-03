import React, {useState} from 'react';
//Styles
import './../styles/details.css';
//Material UI
//Colors
import { green } from '@material-ui/core/colors';
// Inputs
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//Icons
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

export const TaskRow = props => {
    
    // States
    const [openSnackbar, setOpenSnackbar] = useState(false); //Snackbar
    const [updateTaskName, setUpdateTaskName] = useState(props.task.name); //Tasks
    const [taskDescription, setTaskDescription] = useState(props.task.description);
    const [updateTaskDone, setUpdateTaskDone] = useState(props.task.done === 'true' || props.task.done === true ? true : false);
    const [showDetails, setShowDetails] = useState(false);
    const [required, setRequired] = useState('required'); //Validate Name

    // functions
        //Set state by task name
        // ***********************************************************************
        const updateNewTaskName = e => {
            setUpdateTaskName(e.target.value);
            updateTaskName.length > 1 ? setRequired('required') : setRequired('show-required');
        }
        //Set state by task description
        // ***********************************************************************
        const updateNewTaskDesc = e => setTaskDescription(e.target.value);
        //set state by task updated 
        // ***********************************************************************
        const updateNewTaskDone = e => setUpdateTaskDone(e.target.value);

        const updateCheckDone = () => {
            props.toggleTask(props.task);
            setUpdateTaskDone(!props.task.done);
        }

        //Snackbar 
        // *******************************************************************
        const handleClickSnackbar = () => {
            setOpenSnackbar(true);
        };
        const handleCloseSnackbar = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setOpenSnackbar(false);
        };
        //Delete task 
        // ***********************************************************************
        const deleteTask = () => {
            props.callback(props.task);
        }
        //Update task 
        // ***********************************************************************
        const updateTask = () => {
            if(updateTaskName === ''){
                setRequired('show-required')
            }else{
                handleClickSnackbar();
                setShowDetails(false)
                props.updateTask(props.task, updateTaskName, updateTaskDone, props.task.created, taskDescription);
            }
        }

    return(
        <tr key={props.task.name} className="" style={{}}>
            <td class="td-checked">
                <FormControlLabel
                    className=""
                    type="checkbox"
                    checked={props.task.done}
                    inputProps={{ 'aria-label': 'checkbox' }}
                    onChange={() => updateCheckDone()}
                    control={
                        <Checkbox 
                            icon={<CheckCircleOutlineRoundedIcon/>}
                            checkedIcon={<CheckCircleRoundedIcon style={{color: green[500]}}/>}
                            name="checkedH"
                        />
                    }
                />
            </td>
            <td
               className="task-name td-click"
               onClick={() => setShowDetails(true)}
            >
                {props.task.name}
            </td>
            <td className="td-created td-click" onClick={() => setShowDetails(true)}>
                {props.task.created}
            </td>
            <td className="td-click td-details" onClick={() => setShowDetails(true)}>
                {props.task.description}
            </td>

            {
                showDetails ? (
                    <div>
                        <div className="background" onClick={() => setShowDetails(false)}>
                        </div>
                        <div className="task-details">
                            <button className="btn float-right mt-4 mr-3" onClick={() => {setShowDetails(false)}}>
                                <CloseIcon fontSize="large"/>
                            </button>
                            <div className="content-details">
                                <textarea
                                    className="input-edit mb-4 font-weight-bolder"
                                    value={updateTaskName}
                                    onChange={updateNewTaskName}
                                    placeholder="Title"
                                    rows="1"
                                >
                                </textarea>
                                <span id='required' className={required}>Required</span>
                                <div className="dropdown">
                                    <select name="done" value={updateTaskDone} onChange={updateNewTaskDone}>
                                        <option value={false} selected={props.task.done ? 'selected' : ''}> Status: Pending</option>
                                        <option value={true} selected={props.task.done ? 'selected' : ''}>Status: Completed</option>
                                    </select>
                                </div>
                                <span className="font-weight-bold mt-4">
                                    Created
                                </span>
                                <span className="mt-2">
                                    {props.task.created}
                                </span>
                                <span className="mt-4 font-weight-bold">
                                    Description
                                </span>
                                <textarea 
                                    className="mt-2 textarea-edit"
                                    value={taskDescription}
                                    rows="4"
                                    onChange={updateNewTaskDesc}
                                    placeholder="Description"
                                >
                                </textarea>
                                <span className="mt-4">
                                    <p>
                                        {props.task.updated ? 'Updated ' + props.task.updated + ',' : 'It has not been updated yet,'}
                                    </p>
                                    <p>
                                        by {props.task.user}
                                    </p> 
                                </span>
                            </div>
                            <button 
                                className="btn btn-edit btn-gray mr-3"
                                onClick={updateTask}
                            >
                                <EditIcon style={{color: '#3b5cbd'}}/> Edit
                            </button>
                            <button
                                className="btn btn-delete btn-gray"
                                onClick={deleteTask}
                            >
                                <DeleteIcon style={{color: '#3b5cbd'}}/> Delete
                            </button>
                        </div>
                    </div>
                ) : <div></div> 
            }
        </tr>
    );
}