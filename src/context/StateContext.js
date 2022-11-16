import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import firebase from './firebase_config.js';

const Context = createContext();

export const StateContext = ({ children }) => {
  const userCollectionRef = collection(firebase, 'quizes');
  const [users, setUsers] = useState([]);
  const [userAddedNotification, setUserAddedNotification] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUsers() {
      setIsLoading(true);
      const data = await getDocs(userCollectionRef);
      const dataArray = data.docs.map((user) => {
        return { id: user.id, ...user.data() };
      });
      setUsers(dataArray);
      setIsLoading(false);
    }
    getUsers();
  }, [userAddedNotification]);

  async function createQuestionaire(questionaire) {
    console.log('Registering');
    const newQuestionaire = await addDoc(userCollectionRef, {
      questionaire,
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
      value={{ users, createQuestionaire, editUser, deleteUser, isLoading }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
