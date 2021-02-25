import React, { useEffect, useRef } from 'react'
import reactDom from 'react-dom';
import './TextArea.css';

function TextArea({rows, value, onChangeText = f => f, onBlur = f => f,className}) {
    
    const inputRef = useRef(null);

    useEffect(() => {  
        autoresize(inputRef.current);  
    }, [])  

    function autoresize(elem) {
        elem.style.height = "auto";
        elem.style.height = elem.scrollHeight + "px";
        elem.scrollTop = elem.scrollHeight;
        window.scrollTo(window.scrollLeft, elem.scrollTop + elem.scrollHeight);
    }
    function handleChange(text) {
        onChangeText(text);
    }

    function handleBlur(text) {
        onBlur(text);
    }

    return (
        <div className={'text_area ' + className}>
            <textarea ref={inputRef}
                        className="form-control"
                        rows={rows} 
                        onChange={(e) => {handleChange(e.target.value); autoresize(e.target);}} 
                        onBlur={(e) => handleBlur(e.target.value)}
                        value={value}></textarea>
        </div>
    )
}

export default TextArea
