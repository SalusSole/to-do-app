import React, { useState, useEffect } from 'react';
import { TaskRow } from './components/TaskRow';
import { TaskBanner } from './components/TaskBanner';
import { AddTask } from './components/AddTask';
import { TaskCompleted } from './components/TaskCompleted';

//Material UI
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function App() {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
      setOpen(true);
  };

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
      return;
      }

      setOpen(false);
  };

  const [snackbarState, setSnackbarState] = useState('');

  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  //Get Items of the local storage
  useEffect(() => {
    let data = localStorage.getItem('task');
    if(data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setTaskItems([
        { name:'Agregar mi primera nota', done: false }
      ])
      // setShowCompleted(true);
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

  const updateTask = (taskName, taskUpdated, taskUpdatedDone) => {

    var i = taskItems.indexOf(taskName);
    var arrItems = [...taskItems];
    if (i !== -1) {
      arrItems[i] = taskUpdated;
      arrItems.splice(i, 1);
      // console.log(taskUpdatedDone);
      setTaskItems([...arrItems, {name: taskUpdated, done: taskUpdatedDone}]);
    }
  }

  const createNewTask = taskName => {
    if(!taskItems.find(t => t.name === taskName) && taskName.length > 0){
      setTaskItems([...taskItems, {name: taskName, done: false}]);
      setSnackbarState('Added task');
      handleClick();
    }else if(taskItems.find(t => t.name === taskName)){
      setSnackbarState('The task already exists');
      handleClick();
    }
  };

  const toggleTask = task =>
    setTaskItems(taskItems.map(t => t.name === task.name ? {...t, done: !t.done} : t))

  const taskTableRowsCompleted = (doneValue) => 
    taskItems
    .filter(t => t.done === doneValue)
    .map(task => (
      <TaskRow 
        task={task}
        key={task.name}
        toggleTask={toggleTask}
        callback={deleteTask}
        updateTask={updateTask}
      >
      </TaskRow>
  ));

  return (
    <div className="">
      <TaskBanner taskItems={taskItems}></TaskBanner>
      <div className="container p-3">
        <AddTask callback={createNewTask}></AddTask>
        {taskTableRowsCompleted(false)}
        <div className="text-secondary text-center o-2">
          <TaskCompleted
            description="Completed Task"
            isChecked={showCompleted}
            callback={checked => setShowCompleted(checked)}
          ></TaskCompleted>
        </div>
        {
          showCompleted && (
            <div>
                {taskTableRowsCompleted(true)}
            </div>
          )
        }
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={snackbarState === 'Added task' ? 'success' : 'error'  }
          >
            {snackbarState}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default App;
