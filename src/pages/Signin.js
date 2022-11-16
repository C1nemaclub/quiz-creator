import React, { useState, useEffect } from 'react';

import { useStateContext } from '../context/StateContext.js';

export default function Signin() {
  const { createUser } = useStateContext();
  const [quiz, setQuiz] = useState({
    question: '',
    category: 'Physics',
    answers: [
      {
        option: 'Test option',
        correct: false,
      },
    ],
  });

  function newAnswer() {
    setQuiz((prev) => {
      return {
        ...prev,
        answers: [
          ...prev.answers,
          {
            option: 'Hola',
            correct: false,
          },
        ],
      };
    });
  }
  const [questions, setQuestions] = useState([
    {
      question: 'Belgium Capital?',
      category: 'Geography',
      answers: [
        {
          option: 'Bruselas',
          correct: false,
        },
        {
          option: 'Madrid',
          correct: false,
        },
        {
          option: 'Brujas',
          correct: true,
        },
      ],
    },
  ]);

  function onChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setQuiz((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setQuestions((prev) => {
      return [
        ...prev,
        {
          question: 'Nueva pregunta',
          category: 'test',
          answers: [
            {
              option: 'option1',
              correct: false,
            },
            {
              option: 'option2',
              correct: false,
            },
            {
              option: 'option3',
              correct: true,
            },
          ],
        },
      ];
    });
  }

  const questionElements = questions.map((item, index) => {
    return (
      <div key={index}>
        {item.question}
        {item.answers.map((option) => {
          return <li key={option.option}>{option.option}</li>;
        })}
      </div>
    );
  });

  const currentAnswerElements = quiz.answers.map((item) => {
    console.log(item);

    return <li key={item.option}>{item.option}</li>;
  });
  return (
    <section className='section register-section'>
      <div className='container'>
        <h2 className='section-header'>New Quiz</h2>
        <div className='form-container'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='step-zero'>
              <div className='input-group'>
                <label htmlFor=''>Question {questionElements.length + 1}</label>
                <input
                  type='text'
                  value={quiz.question}
                  onChange={onChange}
                  name='question'
                />
              </div>
              <div className='input-group'>
                <label htmlFor=''></label>
                <input type='text' value='1000KM' onChange={onChange} />
                <select name='' id=''>
                  <option value=''>True</option>
                  <option value=''>False</option>
                </select>
                <button type='button' onClick={newAnswer}>
                  New Answer
                </button>
              </div>
              {currentAnswerElements}
              <button>Add</button>
            </div>

            <div className='step-two'>{questionElements}</div>
          </form>
        </div>
      </div>
    </section>
  );
}
