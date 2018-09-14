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
         signupSuccessfull: 'Successfully signup'
       }
    }

    case 'SIGNUP_REJECTED':{
      return {
        ...state
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

    


    default:
      return {
        ...state,
        eventName:'',
        eventDescription:'',
        duration:'',
        location:'',
        participantNo:'',
        tags:'',
        fees:''
      }
  }
  return state
}
