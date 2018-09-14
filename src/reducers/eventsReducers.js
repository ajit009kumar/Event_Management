'use strict'
// import uniq from 'lodash/uniq'
// import _ from 'lodash'

const defaultState = {
  filters: [],
  invalidCredentialErrorMessage:undefined,
  passwordErrorMessage:undefined,
  emailErrorMessage:undefined,
  userInfo:{},
  signupSuccessfull:undefined,
  eventNameErrorMessage:undefined,
  eventDescriptionErrorMessage:undefined,
  durationErrorMessage:undefined,
  locationErrorMessage:undefined,
  feesErrorMessage:undefined,
  tagsErrorMessage:undefined,
  participantNoErrorMessage:undefined,
  eventName:'',
  eventDescription:'',
  duration:'',
  location:'',
  participantNo:'',
  tags:'',
  fees:'',
  openDialog:false,
  openSuccessModal:false,
  availableEvents:[],
  nameErrorMessage:undefined,
  signupRejectedErrorMessage:undefined,
  openSuccessSignup:false
}

export function eventsReducers (state = {events: []}, action) {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { fieldName, value } = action;
      return {
        ...state,
        [fieldName]: value,
        [`${fieldName}ErrorMessage`]: undefined,
      };
    }

    case 'LOGIN_FULFILLED':{
      return{
        ...state,
        userInfo:action.data
      }
    }

    case 'LOGIN_REJECTED':{
      return {
        ...state,
        invalidCredentialErrorMessage:action.err.errors.invalidCredential ? action.err.errors.invalidCredential: undefined,
        passwordErrorMessage: action.err.errors.password ? action.err.errors.password : undefined,
        emailErrorMessage: action.err.errors.email ? action.err.errors.email : undefined
      }
    }

    case 'SIGNUP_FULFILLED':{
       return{
         ...state,
         signupSuccessfull: 'Successfully signup',
         openSuccessSignup:true
       }
    }

    case 'SIGNUP_REJECTED':{
      return {
        ...state,
        // signupRejectedErrorMessage:action.error,
        emailErrorMessage:action.error.email ? action.error.email  : undefined,
        passwordErrorMessage: action.error.password ? action.error.password : undefined
      }
    }

    case 'EVENTNAME_INVALID':{
        return {
          ...state,
          eventNameErrorMessage:action.error
        }
    }

    case 'EVENT_DURATION_INVALID':{
      return {
        ...state,
        durationErrorMessage:action.error
      }
    }

    case 'EVENT_LOCATION_INVALID': {
      return {
        ...state,
        locationErrorMessage:action.error
      }
    }

    case 'EVENT_FEES_INVALID':{
      return{
        ...state,
        feesErrorMessage:action.error
      }
    }

    case 'EVENT_TAGS_INVALID':{
      return{
        ...state,
        tagsErrorMessage:action.error
      }
    }

    case 'EVENT_PARTICIPATION_INVALID':{
      return{
        ...state,
        participantNoErrorMessage:action.error

      }
    }

    case 'EVENT_DESCRIPTION_INVALID':{
      return{
        ...state,
        eventDescriptionErrorMessage:action.error
      }
    }

    case 'EVENT_DURATION_TYPE_INVALID':{
      return{
        ...state,
        durationErrorMessage:action.error
      }
    }

    case 'EVENT_FEES_TYPE_INVALID':{
      return{
        ...state,
        feesErrorMessage:action.error
      }
    }

    case 'EVENT_PARTICIPATION_TYPE_INVALID':{
      return {
        ...state,
        participantNoErrorMessage:action.error
      }
    }

    case 'OPEN_DIALOG':{
        return {
          ...state,
          openDialog:true
        }
    }

    case 'CLOSE_DIALOG':{
      return{
        ...state,
        openDialog:false
      }
    }

    case 'CREATE_EVENT_FULFILLED':{
      const { data } = action;
     
      return {
        ...state,
        eventName:data.eventName,
        eventDescription:data.eventDescription,
        duration:data.duration,
        location:data.location,
        participantNo:data.participantNo,
        tags:data.tags,
        fees:data.fees,
        openDialog:false,        
        openSuccessModal:true,
      }
    }

    case 'CREATE_EVENT_REJECTED':{
      return {
        ...state,
        openDialog:false,
        openSuccessModal:false
      }
    }

    case 'CLOSE_SUCCESS_MODAL': {
      return {
        ...state,
        openSuccessModal:false
      }
    }

    case 'FETCH_EVENTS_FULFILLED':{
      return {
        ...state,
        availableEvents:action.data
      }
    }

    case 'SIGNUP_NAME_FIELD_ERROR':{
      return{
        ...state,
        nameErrorMessage:action.error
      }
    }

    case 'SIGNUP_EMAIL_FIELD_ERROR':{
      return{
        ...state,
        emailErrorMessage:action.error
      }
    }

    case 'VALID_EMAIL_ERROR': {
      return{
        ...state,
        emailErrorMessage:action.error
      }
    }
 
    case 'SIGNUP_PASSWORD_ERROR':{
      return {
        ...state,
        passwordErrorMessage:action.error
      }
    }

    case 'CLOSE_SIGNUP_MODULE':{
      return{
        ...state,
        openSuccessSignup:false
      }
    }

    case 'DELETE_EVENT_SUCCESSFULL':{
      return{
        ...state,
        availableEvents:action.data,
        openSuccessModal:true
      }
    }

    default:
      let { eventName , eventDescription , duration , location , participantNo , tags , fees , name , email , password } = state;
      return {
        ...state,
        eventName: eventName ? eventName : '',
        eventDescription: eventDescription ? eventDescription : '' ,
        duration: duration ? duration : '',
        location: location ? location : '',
        participantNo: participantNo ? participantNo : '',
        tags: tags ? tags : '',
        fees: fees ? fees : '',
        name: name  ? name : '',
        email: email ? email : '',
        password: password ? password : ''
      }
  }
  return state
}
