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
  const userCollectionRef = collection(firebase, 'users');
  const [users, setUsers] = useState([]);
  const [userAddedNotification, setUserAddedNotification] = useState('');

  useEffect(() => {
    async function getUsers() {
      const data = await getDocs(userCollectionRef);
      const dataArray = data.docs.map((user) => {
        return { id: user.id, ...user.data() };
      });
      setUsers(dataArray);
    }
    getUsers();
  }, [userAddedNotification]);

  async function createUser(name, email, password) {
    const newUser = await addDoc(userCollectionRef, {
      question: name,
      category: email,
      answers: [
        {
          text: 'Brujas',
          correct: true,
        },
        {
          text: 'Madrid',
          correct: false,
        },
      ],
    });
    console.log('Registering');
    console.log(newUser);

    console.log(`New user with id ${newUser.id}`);
    setUserAddedNotification(name);
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
    <Context.Provider value={{ users, createUser, editUser, deleteUser }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
