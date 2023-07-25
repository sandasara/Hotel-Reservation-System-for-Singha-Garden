import * as yup from "yup";

const phoneRegExp = /^[0-9]{10}$/; // Example: 10 digits for a simple US phone number
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

function isLuhnValid(value) {
    if (/[^0-9-\s]+/.test(value)) return false;
  
    let nCheck = 0;
    let bEven = false;
    value = value.replace(/\D/g, '');
  
    for (let n = value.length - 1; n >= 0; n--) {
      const cDigit = value.charAt(n);
      let nDigit = parseInt(cDigit, 10);
  
      if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
  
      nCheck += nDigit;
      bEven = !bEven;
    }
  
    return nCheck % 10 === 0;
}

export const makeReservationSchema = yup.object().shape({
    firstName: yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be at most 50 characters')
        .matches(/^[a-zA-Z'-]+$/, 'Invalid first name format')
        .test(
        'initial-capital',
        'First name must start with an initial capital letter',
        (value) => {
            if (!value) return true; // Allow empty input
            return /^[A-Z]/.test(value);
        }
        ),

    lastName: yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be at most 50 characters')
        .matches(/^[a-zA-Z'-]+$/, 'Invalid first name format')
        .test(
        'initial-capital',
        'First name must start with an initial capital letter',
        (value) => {
            if (!value) return true; // Allow empty input
            return /^[A-Z]/.test(value);
        }
        ),

    email: yup.string()
        .email("Please enter a valid email")
        .required("Required"),

    tel: yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone number is required'),

    address: yup.string()
        .required('Address is required')
        .min(5, 'Address must be at least 5 characters')
        .max(100, 'Address must be less than 100 characters')
        .matches(/^[A-Za-z0-9\s]+$/, 'Invalid address format. Only letters, numbers, and spaces are allowed.'),

    zip: yup.string()
        .required('Zip code is required')
        .min(5, 'Zip code must be at least 5 characters')
        .max(10, 'Zip code must be less than 10 characters')
        .matches(/^[0-9]+$/, 'Invalid zip code format. Only numbers are allowed.'),

    city: yup.string()
        .required('City is required')
        .max(50, 'City must be less than 50 characters'),
    
    state: yup.string()
        .required('State is required')
        .max(50, 'State must be less than 50 characters'),

    country: yup.string()
        .required('Country is required'),

    cardno: yup.string()
        .required('Credit card number is required')
        .test('creditCard', 'Invalid credit card number', (value) => {
          return isLuhnValid(value.replace(/\s/g, ''));
        }
        ),

    expyear: yup.string()
        .required('Expiration year is required')
        .length(4, 'Expiration year must be 4 digits')
        .matches(/^[0-9]+$/, 'Invalid expiration year'),
        // .min(currentYear, 'Expiration year must be in the future'),

    expmonth: yup.string()
        .required('Expiration month is required')
        .matches(/^(0?[1-9]|1[0-2])$/, 'Invalid expiration month'),

    nameoncard: yup.string()
        .required('Name on credit card is required')
        .matches(/^[A-Za-z]+ [A-Za-z]+$/, 'Invalid name format')
        .max(100, 'Name on credit card must be less than 100 characters'),

    cvv: yup.string()
        .required('CVV is required')
        .matches(/^[0-9]{3,4}$/, 'Invalid CVV format'),

    specialinfo: yup.string()
        .matches(/^[a-zA-Z0-9.,'"!?()\s]+$/, 'Invalid characters in description'),

    paymethod: yup.string()
        .required('Please select a payment method'),

//   password: yup
//     .string()
//     .min(5)
//     .matches(passwordRules, { message: "Please create a stronger password" })
//     .required("Required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "Passwords must match")
//     .required("Required"),
});