import React, { useState, useEffect, useRef } from 'react';
import fetchSuggestions from '../country-suggestions';

const makeCancelable = <T,>(promise: Promise<T>) => {
    let hasCanceled_ = false;
  
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then((val) =>
        hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
      );
      promise.catch((error) =>
        hasCanceled_ ? reject({isCanceled: true}) : reject(error)
      );
    });
  
    return {
      wrappedPromise: wrappedPromise,
      cancel() {
        hasCanceled_ = true;
      },
    };
  };
  
let cancelablePromise: {
    wrappedPromise: Promise<any>;
    cancel(): void;
} | null = null;

const CancelableSearchInput = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [results, setResult] = useState<string[] | null>(null);
    const [isFetching, setFetching] = useState<boolean>(false);
    const searchRef = useRef<string>('');
    const inpRef = useRef<HTMLInputElement|null>(null);
    
    useEffect(() => {
        searchRef.current = searchQuery;
    }, [searchQuery])

    const onSearchQueryChnage = async (event: React.FormEvent<HTMLInputElement>) => {
        setFetching(true);
        const value = event.currentTarget.value;
        setSearchQuery(value);
        if (cancelablePromise) {
            cancelablePromise.cancel();
        }
        if (value.length === 0) {
            // setResult(null);
            // setFetching(false);
            cancelablePromise = makeCancelable<null>(new Promise((res, rej) => {
                setTimeout(() => {
                    console.log('test');
                    res(null);
                }, 100) 
            }));
            
        } else {
            cancelablePromise = makeCancelable<string[]>(fetchSuggestions(value));
        }
        // fetch the results
        const results = await cancelablePromise.wrappedPromise;
        setResult(results);
        setFetching(false);
        // if (value === searchRef.current) {
        //     setResult(results);
        //     setFetching(false);
        // }
    }

    const onCountrySelected = (country: string) => {
        setSearchQuery(country);
        setResult(null);
        inpRef.current!.blur();
    }

    return <div>
        <input ref={inpRef} name="Search Country" value={searchQuery} onChange={onSearchQueryChnage} />
        {
            isFetching ? <p>Loading.....</p> : null
        }
        <ul>
            { 
                results && !isFetching ? results.map(country => {
                  return <li key={country} onClick={() => onCountrySelected(country)}>{country}</li>
                }) : null
            }
        </ul>
    </div>
}

export default CancelableSearchInput;