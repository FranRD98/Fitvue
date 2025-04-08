import { db } from './config'
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'

// Create guide
export async function createGuide(guideData) {
  const dataWithDate = {
    ...guideData,
    created: serverTimestamp(),
  }

  await addDoc(collection(db, 'guides'), dataWithDate)
}

// Get guides
export async function getGuides() {
  const querySnapshot = await getDocs(collection(db, 'guides'))
  const guides = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  return guides
}

// Get category guides
export async function getCategories() {
  const querySnapshot = await getDocs(collection(db, 'categories'))
  const categories = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  return categories
}

// Crear nueva categoría
export async function createCategory(title) {
  const newCategory = { title }
  const docRef = await addDoc(collection(db, 'categories'), newCategory)
  return { id: docRef.id, ...newCategory }
}