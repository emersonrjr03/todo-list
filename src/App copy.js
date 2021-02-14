import React, { Component, useEffect, useRef, useState } from 'react'
import testUtils from 'react-dom/test-utils';
import Clock from './Clock';
import Product from './Product';
import styles from './App.Module.css'
import useRandomJoke from './useRandomJoke';
function App() {

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const [firstName, setFirstName] = useState("Emerson"); 
  const [lastName, setLastName] = useState("Ribeiro"); 

  
  const joke = useRandomJoke(firstName, lastName);

  const generateJoke = (e) => {
    e.preventDefault();

    setFirstName(firstNameRef.current.value);
    setLastName(lastNameRef.current.value);

  }
  return (
      <div className="app">
        <center>
          <h2>The Joke Generator</h2>

          <form>
            <input placeholder="First name" ref={firstNameRef}/>
            <input placeholder="Last name" ref={lastNameRef}/>
            
            <button onClick={generateJoke}>Generate Joke</button>
          </form>
          <h2>{joke}</h2>
        </center>
        
      </div>
  );
  
}

export default App;