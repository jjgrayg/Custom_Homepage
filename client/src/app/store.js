import { configureStore } from '@reduxjs/toolkit';

// Reducer imports
import backgroundReducer from '../features/background/backgroundSlice';
import todosReducer from '../features/todo/todosSlice';
import weatherReducer from '../features/weather/weatherSlice';
import quotesReducer from '../features/quote/quoteSlice';

const store = configureStore({
    reducer: {
        background: backgroundReducer,
        todos: todosReducer,
        weather: weatherReducer,
        quote: quotesReducer
    }
});

const saveTodosLocally = state => {
    try {
        const serialisedState = JSON.stringify(state.todos);
        localStorage.setItem('persistantState', serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

store.subscribe(() => saveTodosLocally(store.getState()));

export default store;