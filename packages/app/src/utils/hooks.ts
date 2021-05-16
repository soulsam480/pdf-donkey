import { RefObject, useEffect, useState } from 'react';

export function useScreenWidth() {
  function getWindowDimensions() {
    const { innerWidth: width } = window;
    return {
      width,
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
export function clickOutsideToggle<T extends HTMLElement>(
  ref: RefObject<T>,
  value: boolean,
  toggle: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (!value) return;
        toggle(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, value]);
}
