import React, { forwardRef, useEffect, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { db } from './firebase';
import './TodoElem.css';

const TodoElem = forwardRef(({todoKey, todo}, ref) => {
    const [wasModified, setWasModified] = useState(false);
    const [description, setDescription] = useState(todo.description);

    useEffect(() => {
        setWasModified(false);
        console.log('updating todo...');
        db.collection("todos").doc(todoKey).update(todo);
    }, [wasModified]);

    const saveNewDescription = () => {
        if(todo.description == description) {
            console.log('There was no changes');
        } else {
            todo.description = description.toUpperCase();
            setDescription(description.toUpperCase());
            setWasModified(true);
        }
    }

    const saveNewState = (done) => {
        todo.done = done;
        console.log(todo);
        
        setWasModified(true);
    }
    const deleteTodo = () => {
        console.log('deleting: ' + todoKey);
        db.collection('todos')
            .doc(todoKey)
            .delete();
    };
    return (
        <div className="w-100" ref={ref}>
              <InputGroup className={'pl-3 pr-3 pb-1 todoContent ' + (todo.done ? 'done' : '')}>
                <InputGroup.Prepend>
                    <InputGroup.Checkbox defaultChecked={todo.done} onChange={(e) => saveNewState(e.target.checked)}/>
                </InputGroup.Prepend>

                <FormControl value={description} onChange={(e) => setDescription(e.target.value)} onBlur={(e) => saveNewDescription(e.target.value)}/>
                
                <Button variant="secondary" className="deleteBtn">
                    <i className="fa fa-close mt-1" onClick={deleteTodo}></i>
                </Button>
            </InputGroup>
        </div>
    )
});

export default TodoElem
