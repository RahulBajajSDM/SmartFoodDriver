/* eslint-disable */
'use strict';
var Regex = {
  validateEmail: function (val) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val,
    );
  },

  validateEmoji: function (text) {
    var reg = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;
    return reg.test(text);
  },
  validateMobile: function (text) {
    if (text.length < 10) {
      return false;
    } else {
      return true;
    }
  },

  validateMobile: function (text) {
    if (text.length < 10) {
      return false;
    } else {
      return true;
    }
  },

  validateRouting: function (text) {
    if (text.length >= 6 && text.length <= 9) {
      return true;
    } else {
      return false;
    }
  },

  validateAcc: function (text) {
    if (text.length >= 6 && text.length <= 20) {
      return true;
    } else {
      return false;
    }
  },

  validateSSN: function (text) {
    if (text.length == 4) {
      return true;
    } else {
      return false;
    }
  },

  validateCardNumber: function (text) {
    if (text && text.length == 16) {
      return true;
    } else {
      return false;
    }
  },

  validateCardYear: function (text) {
    if (text && text.length > 1) {
      return true;
    } else {
      return false;
    }
  },

  validateCardCvv: function (text) {
    if (text && text.length == 3) {
      return true;
    } else {
      return false;
    }
  },

  validateMobileWithoutCC: function (val) {
    return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(
      val,
    );
  },

  validateString: function (val) {
    return /^[a-zA-Z\x20]{3,25}$/.test(val);
  },

  validateStringMinimumLength2: function (val) {
    return /^[a-zA-Z\x20]{2,25}$/.test(val);
  },

  validatePassword: function (val) {
    return /^.{8,}$/.test(val);
  },

  validateNumbers: function (val) {
    return /^[0-9]{0,}$/.test(val);
  },

  validateName: function (val) {
    return /^.{3,}$/.test(val);
  },

  validateOtp: function (val) {
    return /^.{6,}$/.test(val);
  },

  validateYear: function (val) {
    return /^.{4,}$/.test(val);
  },

  validateTruck: function (val) {
    return /^.{1,}$/.test(val);
  },

  validateURL: function (url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url,
    );
  },

  validateApptPrice(val) {
    if (val.length < 2) {
      return false;
    } else {
      return true;
    }
  },

  validatePrice(val) {
    return /^(\d*([.,](?=\d{1}))?\d+)?$/.test(val);
  },

  validateAlphaNumberic(val) {
    return /^[a-zA-Z0-9]*$/.test(val);
  },

  getNumbericValuesFromString(val) {
    return val.match(/^\d+|\d+\b|\d+(?=\w)/g);
  },

  validateDecimalNumbers(val) {
    return /^((\d|[1-9]\d+)(\.\d{0,1})?|\.\d{0,1})$/.test(val);
  },

  validateAddress: function (text) {
    return text.length > 200 ? false : true;
  },

  validatePrice: function (text) {
    return text >= 14 && text <= 45 ? true : false;
  },

  removeTrailingZeros(amount) {
    amount = amount.toString();
    let regEx1 = /^[0]+/; // remove zeros from start.
    let regEx2 = /[0]+$/; // to check zeros after decimal point
    let regEx3 = /[.]$/; // remove decimal point.
    if (amount.indexOf('.') > -1) {
      amount = amount.replace(regEx2, ''); // Remove trailing 0's
      amount = amount.replace(regEx3, '');
    }
    return parseFloat(amount).toFixed(2);
  },

  cardType(number) {
    let re = new RegExp('^4');
    if (number.match(re) != null) return 'Visa';

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
        number,
      )
    )
      return 'Mastercard';

    // AMEX
    re = new RegExp('^3[47]');
    if (number.match(re) != null) return 'AMEX';

    // Discover
    re = new RegExp(
      '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
    );
    if (number.match(re) != null) return 'Discover';

    // Diners
    re = new RegExp('^36');
    if (number.match(re) != null) return 'Diners';

    // Diners - Carte Blanche
    re = new RegExp('^30[0-5]');
    if (number.match(re) != null) return 'Diners - Carte Blanche';

    // JCB
    re = new RegExp('^35(2[89]|[3-8][0-9])');
    if (number.match(re) != null) return 'JCB';

    // Visa Electron
    re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
    if (number.match(re) != null) return 'Visa Electron';
  },
};

module.exports = Regex;
