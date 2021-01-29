import React from 'react';

export const TaskBanner = props => (
    <h4 className="bg-dark text-white text-center p-4">
        Task App
        <span className="text-success">
            &nbsp;({props.taskItems.filter(t => !t.done).length > 0 ? props.taskItems.filter(t => !t.done).length + ' tasks to do' : 'Nothing to do'})
        </span>
    </h4>
)