import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    fetchQuote,
    selectQuote,
    selectAuthor,
    selectBackground,
    selectLoading,
    selectfailed
} from './quoteSlice';

export const QuoteDisplay = () => {
    const quote = useSelector(selectQuote);
    const author = useSelector(selectAuthor);
    const background = useSelector(selectBackground);
    const loading = useSelector(selectLoading);
    const failed = useSelector(selectfailed);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!quote)
            dispatch(fetchQuote());
    }, []);

    return (
        <div className='quote-display' style={background ? {background: `url(${background})`} : {}}>
            <div className='quote-cont'>
                {loading ? <p>Loading...</p> : failed ? <p>Failed to load quote...</p> : (
                    <blockquote className='famous-quote'>
                        <p>&quot;{quote}&quot;</p>
                        <p>-{author}</p>
                    </blockquote>
                )}
            </div>
        </div>
    )
}