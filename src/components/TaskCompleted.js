import React from 'react';
import Switch from '@material-ui/core/Switch';

export const TaskCompleted = props => {
    return (
        <div className="form-check mt-3">
            {/* <input
                type="checkbox"
                className="form-check-input"
                checked={props.isChecked}
                onChange={e => props.callback(e.target.checked)}
            /> */}
            <label htmlFor="form-check-label">
                Show Completed Tasks
            </label>
            <Switch
                checked={props.isChecked}
                color="primary"
                onChange={e => props.callback(e.target.checked)}
                name="checked"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    )
}