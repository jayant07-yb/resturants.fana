import { Fragment, useState , useEffect } from 'react'
const useScreenWidthObserver = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
  
      // Listen for window resize
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return width;

}
export default useScreenWidthObserver;