import { createSlice } from '@reduxjs/toolkit';

const loadFromLocal = () => {
    try {
        const serialisedState = localStorage.getItem('persistantState');
        if (serialisedState === null) return {
            todos: [],
            numTodos: 0
        };
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return {
            todos: [],
            numTodos: 0
        };
    }
}


export const todosSlice = createSlice({
    name: 'todos',
    initialState: loadFromLocal(),
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            state.numTodos++;
        },
        setTodo: (state, action) => {
            if(state.todos.find(todo => todo.id === action.payload))
                state.todos.find(todo => todo.id === action.payload).finished = !state.todos.find(todo => todo.id === action.payload).finished;
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => action.payload !== todo.id);
            state.numTodos--;
        },
        loadTodosFromState: (state, action) => {
            state = action.payload;
        }
    }
});

export default todosSlice.reducer;
export const { addTodo, setTodo, deleteTodo, loadTodosFromState } = todosSlice.actions;
export const selectTodos = state => state.todos.todos;
export const selectNumTodos = state => state.todos.numTodos;