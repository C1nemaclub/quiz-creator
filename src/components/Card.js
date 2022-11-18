import React from 'react';
import '../styles/Card.scss';

export default function Card(props) {
  console.log(props.data);
  const quizCardElements = props.data.map((item) => {
    return (
      <div className='card'>
        <h2>{item.title}</h2>
        <p>Category: {item.category}</p>
        <button onClick={() => props.handleClick(item.id)}>Take Quiz</button>
      </div>
    );
  });

  return <>{quizCardElements}</>;
}
