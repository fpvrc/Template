import axios from 'axios';
import config from '../lib/config.json';
import auth from '@react-native-firebase/auth';
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
