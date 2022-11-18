import React from 'react';
import { useStateContext } from '../context/StateContext.js';
import { toast } from 'react-hot-toast';
import Card from '../components/Card.js';
import '../styles/Home.scss';

export default function Home() {
  const { questionaires, isLoading } = useStateContext();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  function enterQuiz(id) {
    console.log(id);
  }

  return (
    <section className='home-section'>
      <div className='grid-container'>
        <Card data={questionaires} handleClick={enterQuiz} />
      </div>
    </section>
  );
}
