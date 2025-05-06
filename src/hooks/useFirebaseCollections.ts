import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  FirebaseFirestoreTypes,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import {db} from '..';

export function useFirebaseCollections() {
  const createFirebaseCollection = async ({
    collectionName,
    payload,
    docId,
  }: {
    collectionName: string;
    payload: object;
    docId: string;
  }): Promise<Boolean> => {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, payload);
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
  const updateFirebaseCollection = async ({
    collectionName,
    payload,
    docId,
  }: {
    collectionName: string;
    payload: object;
    docId: string;
  }): Promise<Boolean> => {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, payload);
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
  const deleteFirebaseCollectionDoc = async ({
    docId,
    collectionName,
  }: {
    collectionName: string;
    docId: string;
  }): Promise<Boolean> => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };

  const getFirebaseCollection = async ({
    collectionName,
    docId,
  }: {
    collectionName: string;
    docId: string;
  }): Promise<false | FirebaseFirestoreTypes.DocumentData | undefined> => {
    try {
      const docRef = doc(db, collectionName, docId);
      const res = await getDoc(docRef);
      if (res.exists()) {
        return {
          ...res.data(),
        };
      } else {
        return false;
      }
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };

  const createSubCollectionInFirestore = async ({
    mainCollectionName,
    subCollectionName,
    docId,
    subDocId,
    data,
  }: {
    mainCollectionName: string;
    subCollectionName: string;
    docId: string;
    subDocId: string;
    data: object;
  }) => {
    try {
      const subDocRef = doc(
        collection(db, `${mainCollectionName}/${docId}/${subCollectionName}`),
        subDocId,
      );
      await setDoc(subDocRef, data);
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
  const updateSubCollectionInFirestore = async ({
    mainCollectionName,
    subCollectionName,
    docId,
    subDocId,
    data,
  }: {
    mainCollectionName: string;
    subCollectionName: string;
    docId: string;
    subDocId: string;
    data: object;
  }) => {
    try {
      const subDocRef = doc(
        collection(db, `${mainCollectionName}/${docId}/${subCollectionName}`),
        subDocId,
      );
      await updateDoc(subDocRef, data);
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };

  const getSubCollectionFromFirestore = async ({
    mainCollectionName,
    subCollectionName,
    docId,
  }: {
    mainCollectionName: string;
    subCollectionName: string;
    docId: string;
  }) => {
    try {
      const subColRef = collection(
        db,
        `${mainCollectionName}/${docId}/${subCollectionName}`,
      );

      const snapshot = await getDocs(subColRef);
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return docs;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };

  return {
    createFirebaseCollection,
    createSubCollectionInFirestore,
    updateFirebaseCollection,
    deleteFirebaseCollectionDoc,
    getFirebaseCollection,
    getSubCollectionFromFirestore,
    updateSubCollectionInFirestore
  };
}
