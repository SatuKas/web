'use client';

import * as React from 'react';

/**
 * useIsMobile
 *
 * Custom React hook to determine if the current viewport is considered "mobile" based on a breakpoint.
 *
 * @returns {boolean} Returns true if the viewport width is less than the MOBILE_BREAKPOINT, otherwise false.
 */
const MOBILE_BREAKPOINT = 768; // The pixel width threshold for mobile devices

function useIsMobile() {
  // isMobile: stores the current state if the viewport is mobile or not
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Create a MediaQueryList object to observe viewport width changes
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Handler to update isMobile state when the viewport size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Listen to changes in the media query
    mql.addEventListener('change', onChange);

    // Set initial value on mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup event listener on unmount
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Always return a boolean (default to false if undefined)
  return !!isMobile;
}

export default useIsMobile;
