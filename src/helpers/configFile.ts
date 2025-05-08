import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const googleConfigure = () => {
	GoogleSignin.configure({
	  webClientId:
		'223696926651-n3j9ik166e9rc2ohs8ulur1qhlvhusc8.apps.googleusercontent.com',
	  // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
	  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
	  hostedDomain: '', // specifies a hosted domain restriction
	  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
	  accountName: '', // [Android] specifies an account name on the device that should be used
	  iosClientId:
		'223696926651-h73id5tnc6ojjvj5piaevga0otg52jvo.apps.googleusercontent.com',
	  // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
	});
  };