import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";

function App() {
  const theme = "dark"; // Replace with your Redux state or theme management logic

  return (
    <div className="App">
      <div className="relative">
        <div className="fixed top-0 left-0 -z-50">
          {theme === "dark" ? (
            <div
              id="particles"
              className="w-screen h-screen light:bg-[rgb(0,0,0)] dark:bg-[rgb(16,23,42)]"
            />
          ) : null}
        </div>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
