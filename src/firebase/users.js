// src/firebase/users.js
import { db, auth } from './config'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

// Obtener todos los usuarios
export async function getUsers() {
  const snapshot = await getDocs(collection(db, 'users'))
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// Crear usuario en Auth + Firestore
export async function createUser(userData) {
  const { email, password, ...profile } = userData
  const credentials = await createUserWithEmailAndPassword(auth, email, password)

  const newUser = {
    ...profile,
    email,
    created: serverTimestamp(),
  }

  await setDoc(doc(db, 'users', credentials.user.uid), newUser)
}

// Actualizar datos
export async function updateUser(id, userData) {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, userData)
}

// Eliminar usuario
export async function deleteUser(id) {
  await deleteDoc(doc(db, 'users', id))
}
