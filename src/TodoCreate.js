import React, { useEffect, useState } from 'react'
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';

function TodoCreate() {
    
    const [user] = useAuthState(auth);

    const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState("");

    const simulateNetworkRequest = () => {
        return new Promise((resolve) => setTimeout(resolve, 2000));
      }

    const addTodo = (e) => {
        e.preventDefault();
        if(text){
            setLoading(true);
            postTodo(text)
        }
    };

    const postTodo = (text) => {
        
        let todo = {
            done: false,
            description: text.toUpperCase(),
            timestamp: new Date(),
            userId: user.uid
        };
        db.collection("todos").add(todo).then(() => {
            setText("");
            setLoading(false);
        });
    
    }

    return (
        <div className="todo_create__navbar container">
            <form className="w-100">
                <div className="input-group mb-3">
                    <FormControl 
                        type="text" 
                        className="form-control rounded" 
                        placeholder="What to do?" 
                        aria-label="Recipient's username"
                        readOnly={isLoading}
                        onChange={(e) => setText(e.target.value)}
                        value={text} />
                    <Button
                        type="submit"
                        className="input-group-text btn btn-secondary ml-2 d-inline"
                        variant="primary"
                        disabled={isLoading}
                        onClick={!isLoading ? (e) => addTodo(e) : null}>
                        <i className="fa fa-plus mt-1 mr-1" />
                        {isLoading ? 'Adding…' : 'Add'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default TodoCreate
