import React, { useState, useEffect } from 'react';
import '../styles/Quizes.scss';
import { useStateContext } from '../context/StateContext.js';
import { toast } from 'react-hot-toast';

export default function Quizes() {
  const { createQuestionaire } = useStateContext();
  const [createQuiz, setCreateQuiz] = useState({
    title: '',
    category: '',
    questions: [
      {
        question: 'This is a Question',
        answers: [
          {
            option: 'This is an Asnwer',
            correct: true,
          },
          {
            option: 'This is another Asnwer',
            correct: false,
          },
        ],
      },
    ],
  });

  const [newData, setNewData] = useState({
    newQuestion: '',
    newAnswer: '',
    newAnswerIsCorrect: false,
    newAnswers: [],
  });

  function onChange(e) {
    const { name, value } = e.target;
    setCreateQuiz((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function onChangeNew(e) {
    const { name, value } = e.target;
    setNewData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function addNewQuestion() {
    if (newData.newAnswer.length < 1) return;
    setCreateQuiz((prev) => {
      return {
        ...prev,
        questions: [
          ...prev.questions,
          { question: newData.newQuestion, answers: newData.newAnswers },
        ],
      };
    });
    setNewData({
      newQuestion: '',
      newAnswer: '',
      newAnswerIsCorrect: false,
      newAnswers: [],
    });
  }

  function addNewAnswer() {
    setNewData((prev) => {
      return {
        ...prev,
        newAnswers: [
          ...prev.newAnswers,
          { option: newData.newAnswer, correct: newData.newAnswerIsCorrect },
        ],
      };
    });
  }

  const currentQuestions = createQuiz.questions.map((item, index) => {
    return (
      <div key={index}>
        <li>
          {index + 1}.{item.question}
        </li>
        <ul className='answers'>
          <p>Answers</p>
          {item.answers.map((child) => {
            const childStlye = {
              background: child.correct ? 'rgb(188, 250, 216)' : '',
            };
            return (
              <li key={Math.random()} className='answer' style={childStlye}>
                - {child.option}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  const answersToAdd = newData.newAnswers.map((item) => {
    return <li>{item.option}</li>;
  });

  function createNewQuestionaire() {
    createQuestionaire(createQuiz);
  }

  return (
    <section className='quiz-section'>
      <div className='container'>
        <div className='container-left'>
          <h2>New Quiz</h2>
          <div className='input-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              value={createQuiz.title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='category'>Category</label>
            <select name='category' id='category' onChange={(e) => onChange(e)}>
              <option value={'science'}>Science</option>
              <option value={'math'}>Math</option>
              <option value={'geography'}>Geography</option>
              <option value={'animals'}>Animals</option>
            </select>
          </div>
          <div className='input-group'>
            <label htmlFor='newQuestion'>New Question</label>
            <input
              type='text'
              name='newQuestion'
              id='newQuestion'
              value={newData.newQuestion}
              onChange={(e) => onChangeNew(e)}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='newAnswer'>New answer</label>
            <input
              id='newAnswer'
              type='text'
              name='newAnswer'
              value={newData.newAnswer}
              onChange={(e) => onChangeNew(e)}
            />
            <div className='sub-group'>
              <select
                name='newAnswerIsCorrect'
                onChange={(e) => onChangeNew(e)}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
              <button onClick={addNewAnswer}>Add</button>
            </div>
          </div>
          <p>Current Answers</p>
          {newData.newAnswers.length > 0 && <ul>{answersToAdd}</ul>}
          <button onClick={addNewQuestion}>Add Question</button>
        </div>
        <div className='container-right'>
          <h2>Current Quiz</h2>
          <h3>
            Title: <span>{createQuiz.title}</span>
          </h3>
          <h3>
            Category: <span>{createQuiz.category}</span>
          </h3>
          <h3>Questions</h3>
          <div className='current-questions'>
            {createQuiz.questions.length > 0 && (
              <ul className='questions'>{currentQuestions}</ul>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={createNewQuestionaire}
        className='btn btn-primary submit-btn'
      >
        Create
      </button>
    </section>
  );
}
