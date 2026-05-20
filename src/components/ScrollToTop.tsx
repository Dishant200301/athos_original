import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediately scroll to top without animation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Also ensure scroll position is reset after a brief delay
    // to handle any potential timing issues with page rendering
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
