export default {
  tabs: {
    home: 'Home',
    orders: 'Orders',
    profile: 'Profile',
  },
  mainScreen: {
    headerText: 'Delivery to',
    onlyDelivery: 'Only Delivery',
  },
  truckScreen: {
    menuTitle: 'Menu',
    aboutUs: 'About us',
  },
  aboutTrackScreen: {
    subhead: 'What to eat here',
    address: 'Where we are',
    contacts: 'Contacts',
    schedule: 'Schedule',
  },

  common: {
    welcome: 'Welcome!',
    home: 'Home',
    settings: 'Settings',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    logout: 'Logout',
    firstName: 'First name',
    lastName: 'Last name',
    authAgreements: 'I agree with the <0>Terms of Conditions</0> and <1>Privacy Policy</1>',
    forgotPassword: 'Forgot password',
    submit: 'Submit',
    forgotPasswordSuccessTitle: 'Success',
    forgotPasswordSuccessMessage: 'Check you email for reset password',
    cancel: 'Cancel',
  },
  errors: {
    serverError: 'Server Error',
    statusCode: 'Status code: {{code}}',
  },
  validation: {
    required: 'Field is required',
    minString: 'Must be at least {{value}} characters',
    invalidEmail: 'Must be a valid email',
    emailNotExists: 'User with this email not found',
    incorrectPassword: 'Wrong password',
    emailAlreadyExists: 'User with this email already exists',
    notFound: 'Not found',
  },
  imagePicker: {
    selectImage: 'Select image',
    sourceMessage: 'Select image source',
    chooseFromLibrary: 'Choose from Library',
    takePhoto: 'Take Photo',
  },
} as const
