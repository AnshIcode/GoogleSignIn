import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  FirebaseFirestoreTypes,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {db} from '..';

type AuthParams = {
  email: string;
  password: string;
};

type AuthResult = {
  response?: FirebaseAuthTypes.UserCredential;
  error?: string;
};

export const signUpWithEmailAndPassword = async ({
  email,
  password,
}: AuthParams): Promise<AuthResult> => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return {response: response};
  } catch (err: any) {
    const errorMessage = err?.message || 'An error occurred during sign-up.';
    return {error: errorMessage};
  }
};

export const logInWithEmailAndPassword = async ({
  email,
  password,
}: AuthParams): Promise<AuthResult> => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return {response: response};
  } catch (err: any) {
    const errorMessage = err?.message || 'An error occurred during login.';
    return {error: errorMessage};
  }
};

export const logOut = async (): Promise<{error?: string}> => {
  try {
    await auth().signOut();
    return {};
  } catch (err: any) {
    const errorMessage = err?.message || 'An error occurred during logout.';
    return {error: errorMessage};
  }
};
export const googleSignIn = async (): Promise<AuthResult> => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if (!userInfo?.data) {
      return {error: 'An error occurred during Google Sign-In.'};
    }
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo?.data?.idToken,
    );
    const response = await auth().signInWithCredential(googleCredential);
    return {response: response};
  } catch (err: any) {
    const errorMessage =
      err?.message || 'An error occurred during Google Sign-In.';
    return {error: errorMessage};
  }
};

export const createFirebaseCollection = async ({
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
export const updateFirebaseCollection = async ({
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
export const deleteFirebaseCollectionDoc = async ({
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

export const getFirebaseCollection = async ({
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

export const createSubCollectionInFirestore = async ({
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
export const updateSubCollectionInFirestore = async ({
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

export const getSubCollectionFromFirestore = async ({
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

export const deleteSubCollectionFromFirestore = async ({
  mainCollectionName,
  subCollectionName,
  docId,
  subDocId,
}: {
  mainCollectionName: string;
  subCollectionName: string;
  docId: string;
  subDocId: string;
}) => {
  try {
    await deleteDoc(
      doc(
        db,
        `${mainCollectionName}/${docId}/${subCollectionName}/${subDocId}`,
      ),
    );
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
