import {useEffect, useRef} from 'react';

const TextEditor = ({data, setData}) => {

  var refdiv=useRef(null);
  var rte;

  function btnclick(){
    // alert(rte.getHTMLCode());
    console.log(rte.getHTMLCode());
    setData(rte.getHTMLCode())
  }

  setTimeout(function(){
    rte=new window.RichTextEditor(refdiv.current);
    rte.setHTMLCode(data);
  },0)

  return (
    <div className='w-full' >
      <header >
        <div className='bg-sky-950' ref={refdiv}></div>
        
        <div className='flex justify-center w-full mt-2'><button className='px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300 font-semibold text-white shadow-md focus:outline-none transition' onClick={btnclick}>Save</button></div>
        
      </header>
    </div>
  );
}

export default TextEditor;
