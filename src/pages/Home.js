import React from 'react';
import { useStateContext } from '../context/StateContext.js';

export default function Home() {
  const { users, isLoading } = useStateContext();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const questionElement = users.map((item) => {
    return item.questionaire.map((child) => {
      return <div>{child.question}</div>;
    });
  });

  return <div>{questionElement}</div>;
}
