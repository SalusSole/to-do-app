import React, { useState } from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MuiAlert from '@material-ui/lab/Alert';
//Icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

//Colors
import blue from '@material-ui/core/colors/blue';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
} 

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: '5px',
      padding: theme.spacing(2, 4, 3),
    },
}));

export const AddTask = props => {

    // styles
    const classes = useStyles();

    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [show, setShow] = useState(false);
    const [required, setRequired] = useState('required');
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [open, setOpen] = useState(false); //Modal
    const handleOpenModal = () => { setOpen(true) };
    const handleCloseModal = () => { setOpen(false) };

    const updateNewTaskName = e => {
        setNewTaskName(e.target.value);
        newTaskName.length > 1 ? setRequired('required') : setRequired('show-required');
    };
    const updateNewTaskDesc = e => setNewTaskDesc(e.target.value);

    const creatNewTask = () => {
        props.callback(newTaskName, newTaskDesc);
        if(newTaskName === ''){
            setRequired('show-required');
        }else{
            setNewTaskName('');
            setNewTaskDesc('');
            handleCloseModal();
        }
    };
    
    return (

        <div>
            <Button onClick={handleOpenModal} className="container-header">
                <AddCircleOutlineIcon style={{color: blue[800]}}/> <span className="ml-2 mt-1" style={{color: blue[800], fontWeight: 'bold'}}>Add Task</span>
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <form>
                        <h4 class="little-bold pb-3 mb-4 new-task">New Task</h4>
                        <div className="form-group">
                            <label>Title (Required)</label>
                            <input
                                type="text"
                                className="form-controll"
                                value={newTaskName}
                                onChange={updateNewTaskName}
                                required
                            />
                            <span id='required' className={required}>Required</span>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                cols="30"
                                rows="5"
                                value={newTaskDesc}
                                onChange={updateNewTaskDesc}
                            >
                            </textarea>
                        </div>
                        <button
                            type="button"
                            className='mr-3 float-right btn btn-blue btn-save'
                            onClick={creatNewTask}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="mr-3 float-right btn btn-gray btn-cancel"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                    </form>
                    {/* <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity='success'
                        >
                            Task updated
                        </Alert>
                    </Snackbar> */}
                </div>
                </Fade>
            </Modal>

        {/* <div className="my-1">
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
        </div> */}

        </div>

    );
}