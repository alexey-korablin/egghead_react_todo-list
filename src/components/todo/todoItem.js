import React from 'react';
import {partial} from '../../lib/utils';

export const TodoItem = (props) => {
    const handleToggle = partial(props.handleToggle, props.id);
    const handleRemove = partial(props.handleRemove, props.id)
    return (
        <li className="todo-item">
            <span className="delete-item"><a className="delete-item--icon" href="#" onClick={handleRemove}>X</a></span>
            <input type="checkbox" onChange={handleToggle} checked={props.isComplete} />{props.name}
        </li> 
    );         
}

TodoItem.propTypes = {
    id: React.PropTypes.number.isRequired,
    isComplete: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired
}