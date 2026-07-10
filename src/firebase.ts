import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const hasFirebaseConfig = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
)

export const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null
export const db = app ? getFirestore(app) : null

if (app && typeof window !== 'undefined') {
  void isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app)
    }
  })
}

export type Review = {
  id: string
  name: string
  rating: number
  comment?: string
  createdAt?: Date
}

export type ReviewInput = {
  name: string
  rating: number
  comment?: string
}

const reviewsCollection = () => {
  if (!db) {
    throw new Error('Firebase nao configurado.')
  }

  return collection(db, 'reviews')
}

const mapReview = (doc: QueryDocumentSnapshot<DocumentData>): Review => {
  const data = doc.data()

  return {
    id: doc.id,
    name: String(data.name ?? ''),
    rating: Number(data.rating ?? 5),
    comment: String(data.comment ?? ''),
    createdAt: data.createdAt?.toDate?.(),
  }
}

export async function addReview(review: ReviewInput) {
  await addDoc(reviewsCollection(), {
    name: review.name,
    rating: review.rating,
    ...(review.comment ? { comment: review.comment } : {}),
    createdAt: serverTimestamp(),
  })
}

export function getReviews(
  onReviews: (reviews: Review[]) => void,
  onError?: (error: Error) => void,
) {
  if (!db) {
    onReviews([])
    return () => undefined
  }

  const reviewsQuery = query(
    reviewsCollection(),
    orderBy('createdAt', 'desc'),
  )

  return onSnapshot(
    reviewsQuery,
    (snapshot) => {
      onReviews(snapshot.docs.map(mapReview))
    },
    (error) => {
      console.error('Nao foi possivel carregar as avaliacoes do Firestore.', error)
      onError?.(error)
    },
  )
}
