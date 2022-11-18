import React from 'react';
import '../styles/Header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>

        <li>
          <Link to='/quizes'>Quizes</Link>
        </li>
      </ul>
    </nav>
  );
}
