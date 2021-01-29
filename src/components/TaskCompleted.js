import React from 'react';
import Switch from '@material-ui/core/Switch';

export const TaskCompleted = props => {
    return (
        <div className="form-check mt-3">
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