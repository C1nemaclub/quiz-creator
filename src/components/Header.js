import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/sign-in'>Sign in</Link>
        </li>
        <li>
          <Link to='/quizes'>Quizes</Link>
        </li>
      </ul>
    </div>
  );
}
