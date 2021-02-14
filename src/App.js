import { auth, db, provider } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import './App.css';
import LoginForm from './LoginForm';
import TodoCreate from './TodoCreate';
import UserOptions from './UserOptions';
import TodoElem from './TodoElem';
import { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import Logo from './Logo';
import useRandomQuote from './useRandomQuote';

function App() {

  const [user] = useAuthState(auth);
  const [todoDocs, setTodoDocs] = useState([]);
  const query = db.collection('todos').orderBy('timestamp', 'desc');
  
  const [snapshot, loading, error] = useCollection(query);


  const quote = useRandomQuote();

  useEffect(() => {
    setTodoDocs(snapshot?.docs)
    console.log('updating list' + todoDocs?.length)
  }, [snapshot]);

  return (
    <div className="app">
      <div className="app__quote">
        <p>{quote.text}</p>
        <span>({quote.author})</span>
      </div>
      
      <Logo></Logo>
      {!user ? (
          <LoginForm />
      ) : (
        <div className="app__content">
          <div className="align-self-end mr-3 d-flex">
            <label className="mt-3 mr-2 small">{user.displayName}</label>
            <UserOptions user={user} />
          </div>
          <TodoCreate />
          <FlipMove typeName={null}>
            {loading ? (
                <h3>Loading...</h3>
              ): (
                todoDocs?.map((todoDoc)=> {
                  return (<TodoElem key={todoDoc.id} todoKey={todoDoc.id} todo={todoDoc.data()} />);
                }
              )
            )}
          </FlipMove>
        </div>
      )}
    </div>
  );
}

export default App;
