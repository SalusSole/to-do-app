import React, {useState} from 'react';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
// Inputs
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
//Menu
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
//core
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
//lab
import MuiAlert from '@material-ui/lab/Alert';

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
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));


export const TaskRow = props => {
    
    // States
    const [openSnackbar, setOpenSnackbar] = useState(false); //Snackbar
    const [anchorEl, setAnchorEl] = React.useState(null); //Modal
    const [updateTaskName, setUpdateTaskName] = useState(props.task.name); //Tasks
    const [open, setOpen] = useState(false); //Menu

    // styles
    const classes = useStyles();

    // functions
        //set state by task updated 
        // ***********************************************************************
        const updateNewTaskValue = e => setUpdateTaskName(e.target.value);
        //set state by tasks
        // ***********************************************************************
        const [updateTaskDone, setUpdateTaskDone] = useState(props.task.done);
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
        //Modal
        // ***********************************************************************
        const handleClick = (event) => { setAnchorEl(event.currentTarget) };
        const handleCloseMenu = () => { setAnchorEl(null) };
        //Menu
        // ***********************************************************************
        const handleOpen = () => { setOpen(true) };
        const handleClose = () => { setOpen(false) };
        //Delete task 
        // ***********************************************************************
        const deleteTask = () => {
            props.callback(props.task);
        }
        //Update task 
        // ***********************************************************************
        const updateTask = () => {
            handleClickSnackbar();
            handleClose();
            props.updateTask(props.task, updateTaskName, updateTaskDone);
        }

    return(
        <div key={props.task.name} className="my-3 shadow rounded px-3 pt-3 pb-1" style={{}}>
            <div className="row px-3">
            <span
                    className="col-12 align-self-center task-name"
                    onClick={() => console.log("Hola mindp")}
                >
                    {props.task.name}
                </span>
            </div>
            <div className="">
                <FormControlLabel
                    className="ml-2 align-self-start"
                    type="checkbox"
                    checked={props.task.done}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    onChange={() => props.toggleTask(props.task)}
                    control={
                        <Checkbox 
                            icon={<CheckCircleOutlineRoundedIcon/>}
                            checkedIcon={<CheckCircleRoundedIcon/>}
                            name="checkedH"
                        />
                    }
                />
                <IconButton
                    className="float-right align-self-start"
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={deleteTask}>Delete</MenuItem>
                <MenuItem onClick={handleOpen}>Edit</MenuItem>
            </Menu>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Details</h2>
                    <TextField
                        variant="outlined"
                        label="Edit Task"
                        multiline
                        rowsMax={10}
                        type="text"
                        id="transition-modal-description"
                        className="form-controll"
                        value={updateTaskName}
                        onChange={updateNewTaskValue}
                    />
                    <Button
                        className='p-3 text-success'
                        onClick={updateTask}
                    >
                        Ok
                    </Button>
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity='success'
                        >
                            Task updated
                        </Alert>
                    </Snackbar>
                </div>
                </Fade>
            </Modal>
        </div>
    );
}