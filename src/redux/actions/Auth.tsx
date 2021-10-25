import {signInPhone} from '../../api/Auth';

export const doSignInPhone = phone_number => ({
  type: 'SIGN_IN_PHONE',
  payload: signInPhone(phone_number),
});
