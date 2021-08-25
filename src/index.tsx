import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import style from './index.module.css';
import SearchInput from './component/input';
import CancelableSearchInput from './component/cancaellable-search';

const App = () => {
    return <div className={style.app}>
       <h1>User Search With Hooks and Debounce </h1> 
       <div className={style.searchWrapper}>
         <SearchInput label="Search 1" name="Search 1"/>
         <SearchInput label="Search 2" name="Search 2"/>
       </div>
       <h1>Country Search With Cancelable Promise </h1> 
       <div className={style.searchWrapper}>
         <CancelableSearchInput />
       </div>
    </div>
}

const rootEl = document.getElementById('root');
ReactDOM.render(<App />, rootEl);