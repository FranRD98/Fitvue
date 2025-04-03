import { db } from '@/firebase/config'
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

// Get users
export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'))
  const users = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  return users
}

// Edit user information
export const editUser = (user) => {
    console.log('Editar usuario', user)
    // Aquí podrías redirigir a un formulario de edición
}

// Delete user
export const deleteUser = (user) => {
    if (confirm(`¿Eliminar a ${user.name} ${user.last_name}?`)) {
      // Aquí va la lógica para eliminarlo de Firestore
      console.log('Eliminado', user)
    }
}
