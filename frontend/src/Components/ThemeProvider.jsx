import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function ThemeProvider({ children }) {
  const { theme } = useSelector(state => state.theme);

  // useEffect(() => {
  //   const root = document.documentElement;
  //   if (theme === 'dark') {
  //     root.classList.add('dark');
  //     root.style.setProperty('--text-color','white' );
  //   } else {
  //     root.classList.remove('dark');
  //     root.style.setProperty('--text-color', 'black');
  //   }
  // }, [theme]);

  return (
    <div className={theme}>
      <div className='text-sm sm:text-md text-gray-700 max-w-screen dark:text-gray-200 min-h-screen'>
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
