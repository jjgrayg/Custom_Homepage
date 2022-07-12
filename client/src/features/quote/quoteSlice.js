import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQuote = createAsyncThunk(
    'quote/fetchQuote',
    async () => {
        const response = await fetch('https://quotes.rest/qod');
        const json = await response.json();
        return {
            quote: json.contents.quotes[0].quote,
            author: json.contents.quotes[0].author,
            background: json.contents.quotes[0].background
        };
    }
);

export const quoteSlice = createSlice({
    name: 'quote',
    initialState: {
        quote: '',
        author: '',
        background: '',
        loading: false,
        failed: false
    },
    reducers: {
        setQuote: (state, action) => {
            state = action.payload;
        }
    },
    extraReducers: {
        [fetchQuote.pending]: state => {
            state.loading = true;
            state.failed = false;
        },
        [fetchQuote.rejected]: state => {
            state.loading = false;
            state.failed = true;
        },
        [fetchQuote.fulfilled]: (state, action) => {
            state.loading = false;
            state.failed = false;
            state.quote = action.payload.quote;
            state.author = action.payload.author;
            state.background = action.payload.background;
        }
    }
});

export default quoteSlice.reducer;
export const { setQuote } = quoteSlice.actions;
export const selectQuote = state => state.quote.quote;
export const selectAuthor = state => state.quote.author;
export const selectBackground = state => state.quote.background;
export const selectLoading = state => state.quote.loading;
export const selectfailed = state => state.quote.failed;
