import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Shared types
type AuthParams = {
  email: string;
  password: string;
};

type AuthResult = {
  response?: FirebaseAuthTypes.UserCredential;
  error?: string;
};


// Implementation
export function useFirebaseAuthentication() {
  

  const signUpWithEmailAndPassword = async ({
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

  const logInWithEmailAndPassword = async ({
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

  const logOut = async (): Promise<{error?: string}> => {
    try {
      await auth().signOut();
      return {};
    } catch (err: any) {
      const errorMessage = err?.message || 'An error occurred during logout.';
      return {error: errorMessage};
    }
  };
  const googleSignIn = async (): Promise<AuthResult> => {
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

  return {
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
    logOut,
    googleSignIn,
  };
}
