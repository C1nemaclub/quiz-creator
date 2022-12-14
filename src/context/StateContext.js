import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import firebase from './firebase_config.js';

const Context = createContext();

export const StateContext = ({ children }) => {
  const quizesCollectionRef = collection(firebase, 'quizes');
  const [questionaires, setQuestionaires] = useState([]);
  const [userAddedNotification, setUserAddedNotification] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getQuizes() {
      setIsLoading(true);
      const data = await getDocs(quizesCollectionRef);
      const dataArray = data.docs.map((user) => {
        return { id: user.id, ...user.data() };
      });
      setQuestionaires(dataArray);
      setIsLoading(false);
    }
    getQuizes();
  }, [userAddedNotification]);

  useEffect(() => {
    async function getSingleQuiz() {
      const docRef = doc(firebase, 'quizes', 'BI62HfadmVA22Zj4d9Vi');
      const docSnap = await getDoc(docRef);
      const docData = { id: docSnap.id, ...docSnap.data() };
    }
    getSingleQuiz();
  }, []);

  async function createQuestionaire(questionaire) {
    const { title, questions, category } = questionaire;
    console.log('Registering');
    const newQuestionaire = await addDoc(quizesCollectionRef, {
      title,
      category,
      questions,
    });
    console.log(newQuestionaire);

    console.log(`New user with id ${newQuestionaire.id}`);
  }

  async function editUser() {
    const userRef = doc(firebase, 'users', '0PQrz6nOGg1QFDQLCd9j');
    const response = await updateDoc(userRef, {
      name: 'Pedro',
    });

    setUserAddedNotification('jesu');
  }

  async function deleteUser(id) {
    const userRef = doc(firebase, 'users', id);
    const response = await deleteDoc(userRef);
    setUserAddedNotification('delete');
  }

  return (
    <Context.Provider
      value={{
        questionaires,
        createQuestionaire,
        editUser,
        deleteUser,
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
