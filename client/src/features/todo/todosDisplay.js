import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, deleteTodo, setTodo } from './todosSlice';

export const TodosDisplay = () => {
    const todos = useSelector(selectTodos)
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        const id = e.target.value;
        dispatch(deleteTodo(id));
    }

    const handleClick = (e) => {
        e.preventDefault();
        const id = e.target.id;
        dispatch(setTodo(id));
    }

    return (
        <div className='todos-cont'>
            {todos.map((todo, index) => {
                return (
                    <div 
                        onClick={handleClick} 
                        id={todo.id}
                        key={index} 
                        className={'todo todo-' + todo.backgroundName} 
                        style={{
                            backgroundColor: todo.backgroundColor, 
                            border: `3px ${todo.backgroundColor} solid`,
                            opacity: (todo.finished ? 0.5 : 1)
                        }}
                        
                    >
                        <p id={todo.id} >{todo.text}</p>
                        <button value={todo.id} onClick={handleDelete}>X</button>
                    </div>
                )
            })}
        </div>
    )
}