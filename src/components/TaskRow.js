import React, {useState} from 'react';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';

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

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleClickSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenSnackbar(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleCloseMenu = () => {
        setAnchorEl(null);
      };
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [updateTaskName, setUpdateTaskName] = useState(props.task.name);
    const updateNewTaskValue = e => setUpdateTaskName(e.target.value);

    const [updateTaskDone, setUpdateTaskDone] = useState(props.task.done);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const deleteTask = () => {
        props.callback(props.task);
        // console.log(props.task);
    }
    const updateTask = () => {
        handleClose();
        props.updateTask(props.task, updateTaskName, updateTaskDone);
        handleClickSnackbar();
        // console.log(updateTaskName);
    }

    return(
        <Card key={props.task.name} className="my-3" style={{background: '#fffa73'}}>
            <CardContent>
                <Checkbox
                    type="checkbox"
                    checked={props.task.done}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    onChange={() => props.toggleTask(props.task)}
                    />
                <span className="task-name" onClick={() => console.log("Hola mindp")}> {props.task.name} </span>
                <IconButton
                    className="float-right mr-3"
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
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
                    </div>
                    </Fade>
                </Modal>
            </CardContent>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity='success'
                >
                    Task updated
                </Alert>
            </Snackbar>
        </Card>
    );
}