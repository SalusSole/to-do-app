import React, { useState, useEffect } from 'react';
import { TaskRow } from './components/TaskRow';
import { TaskBanner } from './components/TaskBanner';
import { AddTask } from './components/AddTask';
import { TaskCompleted } from './components/TaskCompleted';

function App() {

  // const [userName, setUserName] = useState('user');
  const [taskItems, setTaskItems] = useState([
    { name:'Task One', done: false },
    { name:'Task Two', done: false },
    { name:'Task Three', done: false },
    { name:'Task Four', done: true },
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem('task');
    if(data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setTaskItems([
        { name:'Task One Expample', done: false }
      ])
      setShowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(taskItems));
  }, [taskItems])

  const createNewTask = taskName => {
    if(!taskItems.find(t => t.name === taskName)){
      setTaskItems([...taskItems, {name: taskName, done: false}]);
    }else{

    }
  }

  const toggleTask = task =>
    setTaskItems(taskItems.map(t => t.name === task.name ? {...t, done: !t.done} : t))

  const taskTableRows = doneValue => 
    taskItems
    .filter(t => t.done === doneValue)
    .map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask}></TaskRow>
    ))

  return (
    <div className="">
      <TaskBanner taskItems={taskItems}></TaskBanner>
      <AddTask callback={createNewTask}></AddTask>
      <div className="container">
        <table className="table table-striped table-border">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {taskTableRows(false)}
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center o-2">
          <TaskCompleted
            description="Completed Task"
            isChecked={showCompleted}
            callback={checked => setShowCompleted(checked)}
          ></TaskCompleted>
        </div>

        {
          showCompleted && (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>
                {taskTableRows(true)}
              </tbody>
            </table>
          )
        }

      </div>
    </div>
  );
}

export default App;
