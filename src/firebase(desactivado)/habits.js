import { db } from './config'
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'

// Obtener todos los hábitos de un usuario
export async function getHabits(uid) {
  const q = query(collection(db, 'habits'), where('uid', '==', uid))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// Crear un nuevo hábito
export async function createHabit(habitData) {
  const habitWithTimestamp = {
    ...habitData,
    created: serverTimestamp(),
  }
  await addDoc(collection(db, 'habits'), habitWithTimestamp)
}

// Marcar hábito como completado / no completado
export async function toggleHabitCompletion(habitId, completed) {
  const habitRef = doc(db, 'habits', habitId)
  await updateDoc(habitRef, { completed })
}

// Eliminar un hábito
export async function deleteHabit(habitId) {
  const habitRef = doc(db, 'habits', habitId)
  await deleteDoc(habitRef)
}
