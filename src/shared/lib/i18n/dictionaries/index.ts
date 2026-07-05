import 'server-only'
import type { Locale } from '../config'

export type Dictionary = {
  closeConfirm: {
    title: string
    body: string
    discard: string
    saveDraft: string
  }
  createPost: {
    addPhoto: string
    cropping: string
    filters: string
    publication: string
    back: string
    close: string
    processing: string
    next: string
    publishing: string
    publish: string
    addDescription: string
    preview: string
    myProfile: string
    selectPhotosOrDragDrop: string
    selectFromComputer: string
    openDraft: string
  }
  editPost: {
    title: string
    userAvatar: string
    addDescription: string
    saveChanges: string
  }
  postModal: {
    justNow: string
    userAvatar: string
    avatar: string
    likes: string
    addComment: string
    publish: string
  }
  settings: {
    generalInformation: string
    devices: string
    accountManagement: string
    myPayments: string
    personal: string
    business: string
    oneDay: string
    sevenDays: string
    month: string
    currentSubscription: string
    expireAt: string
    nextPayment: string
    autoRenewal: string
    accountType: string
    yourSubscriptionCosts: string
    or: string
    paymentMethodsPayPal: string
    paymentMethodsStripe: string
    currentDevice: string
    logo: string
    terminateAllSessions: string
    activeSessions: string
    noOtherDevices: string
    dateOfPayment: string
    endDateOfSubscription: string
    price: string
    subscriptionType: string
    paymentType: string
  }
  profile: {
    profileSettings: string
    following: string
    followers: string
    publications: string
    loadingPosts: string
    errorLoadingPosts: string
    noPublications: string
    loading: string
    search: string
    follow: string
    delete: string
    userAvatar: string
    smallPostImage: string
  }
  profileForm: {
    username: string
    firstName: string
    lastName: string
    dateOfBirth: string
    selectYourCountry: string
    country: string
    selectYourCity: string
    city: string
    aboutMe: string
    textArea: string
    saveChanges: string
    saving: string
    usernameRequired: string
    usernameMinLength: string
    usernameMaxLength: string
    usernamePattern: string
    firstNameRequired: string
    firstNameMaxLength: string
    firstNamePattern: string
    lastNameRequired: string
    lastNameMaxLength: string
    lastNamePattern: string
    ageValidation: string
    countryRequired: string
    cityRequired: string
    aboutMeMaxLength: string
    settingsSaved: string
    serverNotAvailable: string
  }
  post: {
    authorAvatar: string
    postContent: string
    avatar: string
    like: string
    viewAllComments: string
    addComment: string
    publish: string
  }
  avatarUploader: {
    selectProfilePhoto: string
  }
  photoUploadCard: {
    addProfilePhoto: string
    error: string
    preview: string
    save: string
    selectFromComputer: string
  }
  profileModal: {
    createPost: string
    createPostForm: string
  }
  messenger: {
    title: string
  }
  search: {
    title: string
  }
  sidebar: {
    feed: string
    create: string
    myProfile: string
    messenger: string
    search: string
    statistics: string
    favorites: string
    logOut: string
  }
  postMenu: {
    edit: string
    delete: string
  }
  confirmChangePost: {
    title: string
    bodyLine1: string
    bodyLine2: string
  }
  modal: {
    confirm: string
    cancel: string
  }
  deletePost: {
    title: string
    body: string
  }
  logOut: {
    title: string
    body: string
  }
  mainPage: {
    registeredUsers: string
  }
  auth: {
    logIn: string
    signUp: string
  }
  signIn: {
    title: string
    emailLabel: string
    emailPlaceholder: string
    passwordLabel: string
    passwordPlaceholder: string
    forgotPassword: string
    submitButton: string
    noAccount: string
    signUpButton: string
  }
}

const dictionaries = {
  ru: () => import('./ru').then((module) => module.default),
  en: () => import('./en').then((module) => module.default),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]() as Promise<Dictionary>
}
