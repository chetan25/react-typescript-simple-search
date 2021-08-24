import React from 'react';
import ReactDOM from 'react-dom';
import style from './index.module.css';
import SearchInput from './component/input';

const App = () => {
    return <div className={style.app}>
        <h1>Hello World</h1>
        <div className={style.searchWrapper}>
            <SearchInput label="Search User 1" name="Users"/>
            <SearchInput label="Search User 2" name="Users2"/>
        </div>
    </div>
}

const rootEl = document.getElementById('root');
ReactDOM.render(<App />, rootEl);