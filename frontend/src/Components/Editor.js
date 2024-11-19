import React, { useEffect } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { useRef } from "react";

const Editor = ({ socketRef, roomId ,onCodeChange}) => {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && !editorRef.current) {
      editorRef.current = CodeMirror.fromTextArea(textareaRef.current, {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });
    }
    editorRef.current.on("change", (instance, changes) => {
      // console.log('changes',changes);
      const { origin } = changes;
      const code = instance.getValue();
      onCodeChange(code);
      console.log("code", code);
      if (origin !== "setValue") {
        socketRef.current.emit("change", {
          roomId,
          code,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("change", ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
  }, [socketRef.current]);

  return (
    <div>
      <textarea
        ref={textareaRef}
        className="flex justify-start items-start bg-pink-400"
        id="realtimeEditor"
        defaultValue="// Enter your code here"
      ></textarea>
    </div>
  );
};

export default Editor;
