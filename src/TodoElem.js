import React, { forwardRef, useEffect, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { db } from './firebase';
import TextArea from './TextArea';
import './TodoElem.css';

const TodoElem = forwardRef(({todoKey, todo}, ref) => {
    const [wasModified, setWasModified] = useState(false);
    const [description, setDescription] = useState(todo.description);

    useEffect(() => {
        setWasModified(false);
        db.collection("todos").doc(todoKey).update(todo);
    }, [wasModified]);

    const saveNewDescription = () => {
        if(todo.description == description) {
            // console.log('There was no changes');
        } else {
            todo.description = description.toUpperCase();
            setDescription(description.toUpperCase());
            setWasModified(true);
        }
    }

    const saveNewState = (done) => {
        todo.done = done;
        
        setWasModified(true);
    }
    const deleteTodo = () => {
        db.collection('todos')
            .doc(todoKey)
            .delete();
    };

    function autoresize(e) {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
        e.target.scrollTop = e.target.scrollHeight;
        window.scrollTo(window.scrollLeft, e.target.scrollTop + e.target.scrollHeight);
        console.log(e.target.style.height);
    }
    return (
        <div className="w-100" ref={ref}>
              <InputGroup className="pl-3 pr-3 pb-1 todoContent">
                <InputGroup.Prepend>
                    <InputGroup.Checkbox defaultChecked={todo.done} onChange={(e) => saveNewState(e.target.checked)}/>
                </InputGroup.Prepend>
                <TextArea className={'ml-1 mr-1' + (todo.done ? ' done' : '')}
                            rows={1} 
                            value={description} 
                            onChangeText={setDescription}
                            onBlur={saveNewDescription} />
                {/* <FormControl as="textarea" 
                            value={description} 
                            className={todo.done ? 'done' : ''} 
                            onChange={(e) => {setDescription(e.target.value); autoresize(e);}} 
                            onBlur={(e) => saveNewDescription(e.target.value)}/> */}
                
                <Button variant="secondary" className="deleteBtn">
                    <i className="fa fa-close" onClick={deleteTodo}></i>
                </Button>
            </InputGroup>
        </div>
    )
});

export default TodoElem
