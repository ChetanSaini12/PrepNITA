import {useEffect, useRef} from 'react';

function TextEditor() {

  var refdiv=useRef(null);
  var rte;

  function btnclick(){
    alert(rte.getHTMLCode());
  }

  setTimeout(function(){
    rte=new window.RichTextEditor(refdiv.current);
    rte.setHTMLCode("Hello World!");
  },0)

  return (
    <div >
      <header >
        <div className='bg-sky-950' ref={refdiv}></div>
        
        <div><button onClick={btnclick}>Show HTML Code</button></div>
        
      </header>
    </div>
  );
}

export default TextEditor;
