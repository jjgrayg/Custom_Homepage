import React, { useState } from 'react';
import { GoogleLogo } from '../data/googleLogo';

export const SearchForm = () => {
    const squareDims = 35;

    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        window.open('https://google.com/search?q=' + encodeURI(search), '__blank');
        setSearch('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='search form'>
                <GoogleLogo />
                <input 
                    type='text'
                    placeholder='Search on Google...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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