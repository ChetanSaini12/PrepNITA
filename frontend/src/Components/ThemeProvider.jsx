import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function ThemeProvider({ children }) {
  const { theme } = useSelector(state => state.theme)

  useEffect(() => {
    if (theme === 'dark') {
      const root = document.documentElement;
     
      root.style.setProperty('--text-color', 'white');
    }
    else {
      const root = document.documentElement;
      root.style.setProperty('--text-color', 'black');
    }
  }, [theme]);

  return (
    <div className={theme}>
      <div className='text-gray-700 dark:text-gray-200 min-h-screen'>
        {children}
      </div>
    </div>
  )
}

export default ThemeProvider
