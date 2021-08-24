import React from 'react';
import style from '../index.module.css';

type SearchDropdownProps<T> = {
    isVisible: boolean,
    results: T[],
    handleClick: (id: string) => void
}

const SearchDropdown = <T extends {id: string, name: string}>({
    isVisible, results, handleClick
}: SearchDropdownProps<T>) => {
   return <div className={`${isVisible ? `${style.suggestionBox} ${style.show}` : style.suggestionBox}`}>
   <ul className={style.suggestionBoxList}>
     {results.map((result: T) => (
       <li  className={style.suggestionBoxListItem} key={result.id} onClick={() => handleClick(result.name)}>
         {result.name}
       </li>
     ))}
   </ul>
 </div>
}

export default SearchDropdown;