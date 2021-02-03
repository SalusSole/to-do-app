import React, { useState, useEffect } from 'react';
import { TaskRow } from './components/TaskRow';
import { TaskBanner } from './components/TaskBanner';
import { AddTask } from './components/AddTask';
import Button from '@material-ui/core/Button';
import moment from 'moment';

//Styles
import './styles/main.css';

//Material UI
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

//Icions
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function App() {

  // States
  const [open, setOpen] = useState(false);
  const [snackbarState, setSnackbarState] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [user, setUser] = useState('');
  const [newUser, setNewUser] = useState('');

  const onChangeUser = e => setNewUser(e.target.value);

  const handleClick = () => {
      setOpen(true);
  };

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
      return;
      }

      setOpen(false);
  };


  //Get Items of the local storage
  useEffect(() => {

    const date = new Date();
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    var month = '';
    for(let i = 0; i < 12; i++){
      if (i === date.getMonth()){
        month = months[i];
      }
    } 
    const createdAt = date.getDate() + '/' + month + '/' + date.getFullYear();

    let data = localStorage.getItem('task');
    if(data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setTaskItems([
        { 
          name:'Create my first note', done: false, 
          created: createdAt,
          description: 'Welcome to Task App, you can add a new task by clicking on Add task. Then you can edit the task by clicking on the task and change in the pop-up window the title text, the description or mark the task as complete or pending. Then you should click on the Edit button. You can also delete the task by clicking the Delete button.',
          updated: '',
          user: 'The Creator'
        }
      ])
    }
  }, []);

  //Set Item on the local storage
  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(taskItems));
  }, [taskItems]);

  const deleteTask = taskName => {

    var i = taskItems.indexOf(taskName);
    const arrItems = [...taskItems];
    if (i !== -1) {
      arrItems.splice(i, 1);
      setTaskItems(arrItems);
    }
  }

  const updateTask = (taskName, taskUpdated, taskUpdatedDone, createdAt, description) => {
    var i = taskItems.indexOf(taskName);
    var arrItems = [...taskItems];
    if (i !== -1) {
      arrItems[i] = taskUpdated;
      arrItems.splice(i, 1);
      setTaskItems([...arrItems, {
        name: taskUpdated,
        done: taskUpdatedDone === 'true' ? true : false,
        created: createdAt,
        description: description,
        updated: moment().calendar(),
        user: user
      }]);
      setSnackbarState('Updated task');
      handleClick();
    }
  }

  const createNewTask = (taskName, taskDesc) => {
    const date = new Date();
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    var month = '';
    for(let i = 0; i < 12; i++){
      if (i === date.getMonth()){
        month = months[i];
      }
    } 
    const createdAt = date.getDate() + '/' + month + '/' + date.getFullYear();
    if(!taskItems.find(t => t.name === taskName) && taskName.length > 0){
      setTaskItems([...taskItems, {
        name: taskName,
        done: false,
        created: createdAt,
        description: taskDesc,
        updated: '',
        user: user
      }]);
      setSnackbarState('Added task');
      handleClick();
    }else if(taskItems.find(t => t.name === taskName)){
      setSnackbarState('The task already exists');
      handleClick();
    }else{
      // return false;
    }
  };

  const toggleTask = task =>
    setTaskItems(taskItems.map(t => t.name === task.name ? {...t, done: !t.done} : t))

  if(user !== ''){
    return (
      <div className="app-container">
        <TaskBanner taskItems={taskItems}></TaskBanner>
        <div className="content">
          <div className="row pt-4 pl-4 pb-3 align-items-center grid-header">
            <div className="col-7 tasks-col grid-content-taska">
              <h5 className="little-bold">Tasks</h5>
            </div>
            <div className="col-3 grid-content-created">
              <span className="border container-header">
                <span className="text-secondary created-span-none">
                  Created:
                </span>
                <span className="created-span p-2 text-secondary">
                  02/Feb/2021
                </span>
                <CalendarTodayIcon className="calendar-icon" fontSize="small"/>
              </span>
            </div>
            <div className="col-2 grid-content-add">
              <AddTask callback={createNewTask}></AddTask>
            </div>
          </div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Title</th>
                <th scope="col">Created</th>
                <th scope="col" className="description-table">Description</th>
              </tr>
             </thead>
             <tbody>
              {
                taskItems
                .map(task => (
                  <TaskRow 
                  task={task}
                  key={task.name}
                  toggleTask={toggleTask}
                  callback={deleteTask}
                  updateTask={updateTask}
                  >
                  </TaskRow>
                ))
              }
            </tbody>
          </table>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={snackbarState === 'Added task' || snackbarState === 'Updated task' ? 'success' : 'error'  }
            >
              {snackbarState}
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  }else{
    return (
      <div>
        <form className="form-user">
          <label>Enter your name</label>
          <input type="text" placeholder="Name" value={newUser} onChange={onChangeUser}/>
          <Button className="text-primary" onClick={() => setUser(newUser)}>
            <PersonAddIcon fontSize="small"/>
            <span className="mt-1 ml-3">
              OK
            </span>
          </Button>
        </form>
      </div>
    );
  }
}

export default App;
