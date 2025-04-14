import { db } from './config'
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

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

// Create new category
export async function createCategory(title) {
  const newCategory = { title }
  const docRef = await addDoc(collection(db, 'categories'), newCategory)
  return { id: docRef.id, ...newCategory }
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

// Update an existent guide
export async function updateGuide(id, guideData) {
  const docRef = doc(db, 'guides', id)
  const { id: _, created, ...dataWithoutId } = guideData // evitamos sobreescribir id/created
  await updateDoc(docRef, dataWithoutId)
}

// Delete a guide
export async function deleteGuide(id) {
    const ref = doc(db, 'guides', id)
    await deleteDoc(ref)   
}