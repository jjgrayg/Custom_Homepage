import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addTodo, selectNumTodos } from '../features/todo/todosSlice'

const backgroundColors = [{name: 'red', color: 'rgba(255, 0, 0, 0.5)'}, {name: 'green', color: 'rgba(0, 128, 0, 0.5)'}, {name: 'blue', color: 'rgba(0, 0, 255, 0.5)'}, {name: 'yellow', color: 'rgba(255, 255, 0, 0.5)'}];

export const NewTodoForm = () => {
    const squareDims = 35;

    const [todo, setTodo] = useState('');
    const dispatch = useDispatch();

    const numTodos = useSelector(selectNumTodos);

    const handleSubmit = (e) => {
        e.preventDefault();
        const backgroundObj = backgroundColors[(numTodos + 1) % 4];
        const backgroundColor = backgroundObj.color;
        const backgroundName = backgroundObj.name;
        dispatch(addTodo({
            id: uuidv4(),
            backgroundColor: backgroundColor,
            backgroundName: backgroundName,
            text: todo,
            finished: false
        }));
        setTodo('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='form'>
                <input 
                    className='todo-form'
                    type='text'
                    placeholder='Add todo...'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onInvalid={e => e.target.setCustomValidity('You must type something!')}
                    onInput={e => e.target.setCustomValidity('')}
                    required
                />
                <div onClick={handleSubmit} className='submit-button'>
                    <svg xmlns='http://www.w3.org/2000/svg' width={squareDims} height={squareDims} fill='currentColor' className='bi bi-arrow-right-short' viewBox='0 0 16 16'>
                        <path fillRule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z'/>
                    </svg>
                </div>
            </div>
        </form>
    );
}