import { useState, useRef, useEffect} from 'react';

/**
 * Handle click on document, to show/hide an element
 */
const useClickOutsideElement = <T,>() => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const elRef = useRef<T | null>(null);

  const handleClick = () => {
      console.log('clicked')
      if (elRef && elRef.current) {
        console.log('clicked inside')
        setIsVisible(false);
      }
  }

  useEffect(() => {
    console.log('in')
    document.addEventListener('click', handleClick);

    return () => {
        document.removeEventListener('click', handleClick)
    }
  }, []);

  return [elRef, isVisible, setIsVisible] as const;
}

export default useClickOutsideElement;