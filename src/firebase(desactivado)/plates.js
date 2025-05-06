import { db } from './config'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'

// Obtener todos los platos
export async function getPlates() {
  const snapshot = await getDocs(collection(db, 'plates'))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// Crear nuevo plato
export async function createPlate(plateData) {
  const payload = { ...plateData, created: serverTimestamp() }
  await addDoc(collection(db, 'plates'), payload)
}

// Actualizar plato
export async function updatePlate(id, plateData) {
  await updateDoc(doc(db, 'plates', id), plateData)
}

// Eliminar plato
export async function deletePlate(id) {
  await deleteDoc(doc(db, 'plates', id))
}
