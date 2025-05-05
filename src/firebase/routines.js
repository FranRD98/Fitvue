import { db } from './config'
import { collection, addDoc, getDocs, doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore'

// Crear nueva rutina
export async function createRoutine(routineData) {
  const dataWithDate = {
    ...routineData,
    created: serverTimestamp()
  }

  const docRef = await addDoc(collection(db, 'routines'), dataWithDate)
  return { id: docRef.id, ...dataWithDate }
}

// Obtener todas las rutinas
export async function getRoutines() {
  const snapshot = await getDocs(collection(db, 'routines'))
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// Obtener categorias de las rutinas
export async function getRoutineCategories() {
  const snapshot = await getDocs(collection(db, 'routines_categories'))
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

// Actualizar una rutina existente
export async function updateRoutine(id, routineData) {
  const docRef = doc(db, 'routines', id)
  await updateDoc(docRef, {
    ...routineData,
    updated: serverTimestamp()
  })
}

// Asignar rutina a usuario
export async function assignRoutineToUser(userId, routineId) {
  const ref = doc(db, 'users', userId)
  await setDoc(ref, { assignedRoutine: routineId }, { merge: true })
}

// Obtener rutina asignada actual
export async function getAssignedRoutine(userId) {
  const ref = doc(db, 'users', userId)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data().assignedRoutine : null
}

export async function unassignRoutineFromUser(userId) {
  const ref = doc(db, 'users', userId)
  await setDoc(ref, { assignedRoutine: null }, { merge: true })
}
