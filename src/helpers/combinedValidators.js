import Toast from 'react-native-simple-toast';
import * as Regex from 'helpers/Regex';

export const SignUpValidations = (value) => {
  if (!Regex.validateName(value && value.fullName)) {
    Toast.show('Full name should be more than 3 letters.');
    return false;
  } else if (!Regex.validateEmail(value && value.email)) {
    Toast.show('Please enter a valid email address.');
    return false;
  } else if (!Regex.validateMobile(value && value.phone)) {
    Toast.show('Mobile number must contain 10 digits.');
    return false;
  } else if (!Regex.validatePassword(value && value.password)) {
    Toast.show('Password must be of 8 or more characters.');
    return false;
  } else if (!Regex.validatePassword(value && value.confirmPassword)) {
    Toast.show('Confirm password must be of 8 or more characters.');
    return false;
  } else if ((value && value.password) != (value && value.confirmPassword)) {
    Toast.show('Password and confirm password does not match.');
    return false;
  } else if (value && !value.profileObj) {
    Toast.show('Profile image is required!.');
    return false;
  } else {
    return true;
  }
};

export const LoginValidations = (value) => {
  if (!Regex.validateEmail(value && value.email)) {
    Toast.show('Please enter a valid email address.');
    return false;
  } else if (!Regex.validatePassword(value && value.password)) {
    Toast.show('Password must be of 8 or more characters.');
    return false;
  } else {
    return true;
  }
};

export const ForgotPasswordValidations = (value) => {
  if (!Regex.validateEmail(value && value.email)) {
    Toast.show('Please enter a valid email address.');
    return false;
  } else {
    return true;
  }
};

export const ConfirmOTPValidation = (email, password) => {
  if (!Regex.validateOtp(email)) {
    Toast.show('OTP must be of 6 characters.');
    return false;
  } else {
    return true;
  }
};

export const ResetPasswordValidation = (value) => {
  if (!Regex.validatePassword(value && value.password)) {
    Toast.show('Password must be of 8 or more characters.');
    return false;
  } else if (!Regex.validatePassword(value && value.confirmPassword)) {
    Toast.show('Password must be of 8 or more characters.');
    return false;
  } else if ((value && value.password) != (value && value.confirmPassword)) {
    Toast.show('Password and confirm password does not match.');
    return false;
  } else {
    return true;
  }
};

export const CardValidations = (cardNumber, cardYear, cardMonth, cardCvv) => {
  if (!Regex.validateCardNumber(cardNumber)) {
    Toast.show('Card number must be of 16 digits.');
    return false;
  } else if (!Regex.validateCardYear(cardYear)) {
    Toast.show('Please enter a valid year.');
    return false;
  } else if (!Regex.validateCardYear(cardMonth)) {
    Toast.show('Please enter a valid month.');
    return false;
  } else if (!Regex.validateCardCvv(cardCvv)) {
    Toast.show('Cvv must be of 3 digits.');
    return false;
  } else {
    return true;
  }
};
