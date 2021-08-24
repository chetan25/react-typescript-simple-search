import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { debounce} from 'lodash';
import SearchDropdown from './search-dropdown';
import useClickOutsideElement from '../hooks/useClickOutsideElement';
import style from '../index.module.css';

type SearchInputProps = {
    name: string,
  label: string
}
const SearchInput = ({
  name,
  label
}: SearchInputProps) => {
    const [documentRef, isVisible, setIsVisible] = useClickOutsideElement<HTMLDivElement>();
    const [suggestions, setSuggestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const ref = useRef<{}>();

    function processRequest(searchValue: string) {
        console.log({searchValue})
        axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const users = response.data;
            console.log({users})
            const result = users.filter((user: {name: string}) =>
              user.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            console.log({result});
            setSuggestions(result);
            if (result.length > 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        })
        .catch(() => console.log('Something went wrong. Try again later'));
    }
    
    useEffect(() => {
        ref.current = debounce(processRequest, 300);
    }, []);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.currentTarget.value;
        setSearchTerm(value);
        // @ts-ignore
        ref.current(value);
    }

    const handleSuggestionClick = (name: string) => {
        setIsVisible(false);
        setSearchTerm(name);
        setSelectedUser(name);
    }

    return (
        <form>
           <div className={style.formWrapper}>
                <label>{label}</label>
                <div  className={style.inputWrapper}>
                    <input type="text" onChange={handleChange} value={searchTerm} />
                        { isVisible ? 
                        <div ref={documentRef}>
                            <SearchDropdown
                                isVisible={isVisible}
                                results={suggestions}
                                handleClick={handleSuggestionClick}
                            />
                            </div> : null 
                        }
                </div>
                {
                    selectedUser ? <h3>Selected user is {selectedUser} </h3> : null
                }
           </div>
        </form>
    )
}

export default SearchInput;