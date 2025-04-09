import { db } from './config'
import { collection, addDoc, getDocs } from 'firebase/firestore'

// Create an exercise
export async function createExercise(exercise) {
  await addDoc(collection(db, 'exercises'), exercise)
}

// Edit an exercise
export async function editExercise(exercise) {
  await alert('Editando ejercicio: ' + exercise);
}

// Delete an exercise
export async function deleteExercise(exercise) {
  await alert('Eliminando ejercicio: ' + exercise);
}

// Create a category
export async function createCategory(category) {
  await addDoc(collection(db, 'exercise_categories'), category)
}

// Obtain all the exercises
export async function getExercises() {
  const snapshot = await getDocs(collection(db, 'exercises'))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// Obtain all the exercises categories
export async function getExerciseCategories() {
  const snapshot = await getDocs(collection(db, 'exercise_categories'))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}



