
import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import './UserOptions.css';

function UserOptions({user}) {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </a>
      ));

    const [loading, error] = useAuthState(auth);
    
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
                <img width="50" height="50" src={user.photoURL} className="user_options__userProfileImg rounded-circle"/>
            </Dropdown.Toggle>

          
            <Dropdown.Menu className="user_options__dropdown-menu">
                <Dropdown.Item href="#" onClick={() => auth.signOut()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserOptions
