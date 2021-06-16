export default {
  tabs: {
    home: 'Home',
    orders: 'Orders',
    profile: 'Profile',
    places: 'Places',
  },
  mainScreen: {
    headerText: 'Delivery to',
    onlyDelivery: 'Only Delivery',
  },
  truckScreen: {
    menuTitle: 'Menu',
    aboutUs: 'About us',
    redirectButton: 'Go to cart',
  },
  aboutTrackScreen: {
    subhead: 'What to eat here',
    address: 'Where we are',
    contacts: 'Contacts',
    schedule: 'Schedule',
  },
  welcomeScreen: {
    title1: 'Meet Lunché',
    desc1: 'Finding Food Trucks has never been easier',
    title2: 'Order Street Food',
    desc2: 'It’s pretty easy in Lunché. We have more then 100 trucks food in base',
    title3: 'Pickup & Delivery',
    desc3: 'Choose options that will work for you better and we will take care about anything else',
    orderButton: "LET'S ORDER",
  },
  dishModal: {
    addToOrderButton: 'Add to order',
  },
  cartScreen: {
    headerTitle: 'Your Order',
    primaryBtn: 'Continue',
    order: 'Order',
    fee: 'Fee',
    totalDiscounts: 'Total discounts',
    total: 'Total (inc. VAT)',
    commentPlaceholder: 'Add your comment here',
  },
  checkoutScreen: {
    headerTitle: 'Checkout',
    pickUpBtn: 'Pick up',
    deliveryBtn: 'Delivery',
    pickUpLabel: 'Pick up',
    asap: 'ASAP',
    personalInfo: 'Personal information',
    note: 'This information you should use as login for further enters to the app',
    deliverAddress: 'Deliver address',
    deliveryDate: 'Deliver time',
    pickupAt: 'Pickup at',
    pickUpAddress: 'Pickup address',
    submitBtn: 'Continue',
    scheduled: 'Scheduled',
    chooseTime: 'Choose a time',
    paymentLabel: 'Payment method',
    changePaymentMethod: 'Change method',
  },
  changeAddressModal: {
    title: 'Find restaurants near you',
    description: 'Please enter your location or allow access to your location to find restaurants near you.',
    savedLocations: 'Your location',
    recentLocations: 'Recent locations',
  },
  searchTruckModal: {
    inputPlaceholder: 'Type here what you want',
    notFound: 'No found',
    placeholder: 'But don’t worry try again',
  },
  favoritePlacesScreen: {
    headerTitle: 'Saved Places',
  },
  signInScreen: {
    title: 'Welcome',
    subhead: 'Enter your Phone number or Email for sign in',
    signInButton: 'Sign in',
    phoneNumberLabel: 'Phone Number',
  },
  verifyCodeScreen: {
    title: 'Verify phone number',
    subhead: 'Enter the 4-Digit code sent to you at',
    confirmButton: 'Verify',
    terms: 'By Signing up you agree to our Terms Conditions & Privacy Policy.',
    notReceive: "Didn't receive code?",
    resend: 'Resend Again',
  },
  ordersScreen: {
    headerTitle: 'Orders',
    reorder: 'Reorder',
    orderTracker: 'Order Tracker',
  },
  paymentScreen: {
    headerTitle: 'Order Summary',
    cash: 'Cash',
    addNewCard: 'Add a new card',
    chooseMethod: 'Choose method',
    saveMethod: 'Save',
  },
  cardModal: {
    headerTitle: 'Add a new card',
    cardDetails: 'Card details',
    note: 'This card will only be charged when you place an order.',
    saveCard: 'Save card',
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
    select: 'Select',
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
