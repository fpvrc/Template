import axios from 'axios';
import config from '../lib/config.json';
import auth from '@react-native-firebase/auth';

export const signInPhone = async phone_number => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phone_number);
    return confirmation;
  } catch (error: any) {
    throw new Error(error);
  }
};
