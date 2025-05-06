import { db } from './config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'

// Obtener todos los ingredientes
export async function getIngredients() {
  const snapshot = await getDocs(collection(db, 'ingredients'))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// Crear nuevo ingrediente
export async function createIngredient(data) {
  const payload = { ...data, created: serverTimestamp() }
  await addDoc(collection(db, 'ingredients'), payload)
}

// Actualizar ingrediente
export async function updateIngredient(id, data) {
  const ref = doc(db, 'ingredients', id)
  await updateDoc(ref, data)
}

// Eliminar ingrediente
export async function deleteIngredient(id) {
  await deleteDoc(doc(db, 'ingredients', id))
}
