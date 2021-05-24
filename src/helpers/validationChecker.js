import * as Regex from 'helpers/Regex';

const Validation = (text, validationType) => {
  if (validationType == 'email') {
    return Regex.validateEmail(text);
  } else if (validationType == 'password') {
    return Regex.validatePassword(text);
  } else if (validationType == 'name') {
    return Regex.validateName(text);
  } else if (validationType == 'phone') {
    return Regex.validateMobile(text);
  } else if (validationType == 'price') {
    return Regex.validatePrice(text);
  } else if (validationType == 'year') {
    return Regex.validateYear(text);
  } else if (validationType == 'otp') {
    return Regex.validateOtp(text);
  } else if (validationType == 'truck') {
    return Regex.validateTruck(text);
  } else if (validationType == 'price') {
    return Regex.validateApptPrice(text);
  } else if (validationType == 'ssn') {
    return Regex.validateSSN(text);
  } else if (validationType == 'routingNo') {
    return Regex.validateRouting(text);
  } else if (validationType == 'accountNo') {
    return Regex.validateAcc(text);
  } else if (validationType == 'none') {
    return true;
  } else {
    return false;
  }
};

export default Validation;
