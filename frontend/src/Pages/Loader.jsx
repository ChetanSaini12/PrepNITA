import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "../../src/lotties/loader.json";

const quotes = [
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Programmer: A machine that turns coffee into code." },
  { text: "There are 10 types of people in the world: those who understand binary, and those who don’t." },
  { text: "In order to understand recursion, one must first understand recursion." },
  { text: "It's not a bug – it's an undocumented feature." },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { text: "Code never lies, comments sometimes do.", author: "Ron Jeffries" },
  { text: "The best thing about a boolean is even if you are wrong, you are only off by a bit." },
  { text: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.", author: "Edsger Dijkstra" },
  { text: "To iterate is human, to recurse divine.", author: "L. Peter Deutsch" },
  { text: "It works on my machine." },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann" },
  { text: "Real programmers count from 0." },
  { text: "Deleted code is debugged code.", author: "Jeff Sickel" },
  { text: "Code as if your life depends on it, because it does." },
  { text: "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25." },
  { text: "The sooner you start to code, the longer the program will take.", author: "Roy Carlson" }
];

export const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(`${randomQuote.text} ${randomQuote.author ? `- ${randomQuote.author}` : ""}`);
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen border-spacing-0">
      {/* <Lottie
          options={defaultOptions}
          height={100}
          width={200}
      /> */}
      <div className="loader"></div>
      <p className="text-neutral-500 font-bold font-sans">{quote}</p>
    </div>
  );
};
