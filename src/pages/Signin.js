import React, { useState, useEffect } from 'react';

import { useStateContext } from '../context/StateContext.js';

export default function Signin() {
  const { createQuestionaire } = useStateContext();
  const [quiz, setQuiz] = useState({
    question: '',
    category: '',
    newAnswer: '',
    newAnswerIsCorrect: false,
    answers: [],
  });

  function onChange(e) {
    const { name, value } = e.target;
    setQuiz((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function newAnswer() {
    setQuiz((prev) => {
      return {
        ...prev,
        answers: [
          ...prev.answers,
          {
            option: quiz.newAnswer,
            correct: quiz.newAnswerIsCorrect,
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

  function addNewQuestion() {
    setQuestions((prev) => {
      return [
        ...prev,
        {
          question: quiz.question,
          category: quiz.category,
          answers: quiz.answers,
        },
      ];
    });
    setQuiz({
      question: '',
      category: '',
      newAnswer: '',
      newAnswerIsCorrect: false,
      answers: [],
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    createQuestionaire(questions);
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
                  required
                />
              </div>
              <div className='input-group'>
                <label htmlFor=''>Category</label>
                <select name='category' id='' onChange={onChange} required>
                  <option value='none' hidden>
                    Select a Category
                  </option>
                  <option value='Math'>Math</option>
                  <option value='Physics'>Physics</option>
                  <option value='Science'>Science</option>
                </select>
              </div>
              <div className='input-group'>
                <label htmlFor=''>New Answer</label>
                <input
                  type='text'
                  value={quiz.newAnswer}
                  onChange={onChange}
                  name='newAnswer'
                />
                <select name='newAnswerIsCorrect' id='' onChange={onChange}>
                  <option value='none' hidden>
                    False or True
                  </option>
                  <option value={false}>False</option>
                  <option value={true}>True</option>
                </select>
                <button type='button' onClick={newAnswer}>
                  Add Answer
                </button>
              </div>
              {currentAnswerElements}
              <button type='button' onClick={addNewQuestion}>
                Add new Question
              </button>
              <button type='submit'>Submit</button>
            </div>
            <div className='step-two'>{questionElements}</div>
          </form>
        </div>
      </div>
    </section>
  );
}
