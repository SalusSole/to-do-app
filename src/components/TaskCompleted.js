import React from 'react';

export const TaskCompleted = props => {
    return (
        <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                checked={props.isChecked}
                onChange={e => props.callback(e.target.checked)}
            />
            <label htmlFor="form-check-label">
                Show Completed Tasks
            </label>
        </div>
    )
}