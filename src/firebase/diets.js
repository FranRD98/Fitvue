// src/firebase/diets.js
import { db } from './config'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

export async function getDiets() {
  const snapshot = await getDocs(collection(db, 'diets'))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function createDiet(data) {
  const diet = { ...data, created: serverTimestamp() }
  const docRef = await addDoc(collection(db, 'diets'), diet)
  return { id: docRef.id, ...diet }
}

export async function updateDiet(id, data) {
  await updateDoc(doc(db, 'diets', id), data)
}

export async function deleteDiet(id) {
  await deleteDoc(doc(db, 'diets', id))
}
