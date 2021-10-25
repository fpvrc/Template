import axios from 'axios';
import config from '../lib/config.json';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';

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
    console.log('here');
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('here');
    const {identityToken, nonce} = appleAuthRequestResponse;
    console.log(identityToken);
    if (identityToken) {
      const appleCredential = firebase.auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      const userCredential = await firebase
        .auth()
        .signInWithCredential(appleCredential);
      console.log('here');
    } else {
      throw new Error('Null token');
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
