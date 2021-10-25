import axios from 'axios';
import config from '../lib/config.json';
import auth from '@react-native-firebase/auth';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const signInPhone = async phone_number => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phone_number);
    return confirmation;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signInApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const {identityToken, nonce} = appleAuthRequestResponse;
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      const userCredential = await auth().signInWithCredential(appleCredential);
    } else {
      throw new Error('Null token');
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signInGoogle = async () => {
  try {
    console.log('hi');
    GoogleSignin.configure({
      webClientId: '',
    });
    console.log('hi');
    const {idToken} = await GoogleSignin.signIn();
    console.log('hi');
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('hi');
    const userCredential = await auth().signInWithCredential(googleCredential);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
