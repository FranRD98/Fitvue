// rutinaService.js
import { db } from '@/firebase/config'
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const rutinasRef = collection(db, 'Rutinas')

export const getRoutines = async () => {
  const snapshot = await getDocs(rutinasRef)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const obtenerRutinaPorId = async (id) => {
  const docRef = doc(db, 'Rutinas', id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) throw new Error('Rutina no encontrada')
  return { id: docSnap.id, ...docSnap.data() }
}

export const crearRutina = async (rutinaData) => {
  const docRef = await addDoc(rutinasRef, rutinaData)
  return docRef.id
}

export const modificarRutina = async (id, newData) => {
  const docRef = doc(db, 'Rutinas', id)
  await updateDoc(docRef, newData)
}

export const eliminarRutina = async (id) => {
  const docRef = doc(db, 'Rutinas', id)
  await deleteDoc(docRef)
}
