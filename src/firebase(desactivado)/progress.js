import { db } from './config'
import { collection, query, where, doc, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

// Create a review
export async function createReview(data) {
  await addDoc(collection(db, 'progress'), data)
}

// Edit a review
export async function updateReview(id, updatedData) {
  const ref = doc(db, 'progress', id)
  await updateDoc(ref, updatedData)
}

// Delete a review
export async function deleteReview(id) {
    const ref = doc(db, 'progress', id)
    await deleteDoc(ref)   
}

// Obtain all the reviews by userId (UID)
export async function getReviewsById(uid) {
    const q = query(collection(db, 'progress'), where('uid', '==', uid))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// Obtain a review by id
export async function getReviewById(uid, reviewDate) {
    const q = query(
        collection(db, 'progress'),
        where('uid', '==', uid),
        where('date', '==', reviewDate)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}



