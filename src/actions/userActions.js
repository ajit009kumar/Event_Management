'use strict'
import axios from 'axios';
import validator from 'validator';
import Auth from '../modules/Auth';
import { post , get, put } from '../utils/requests';
import { apiEndPoint, apiURL } from '../utils/config';
// import { get } from 'http';
// import validator from "validator";




export function updateField(fieldName,value){
  return function (dispatch) {
    dispatch({
      type: 'UPDATE_FIELD',
      fieldName,
      value,
    })
  }
}

export const loginUser = (email,password) => (dispatch, getState)  => {
    dispatch({
      type:'LOGIN',
      payload:  post(`${apiEndPoint}/auth/login`,{email,password})
                .then((res) => {
                  dispatch({
                    type:'LOGIN_FULFILLED',
                    data:res
                  })
                })
                .catch((err) => {
                  dispatch({
                    type:'LOGIN_REJECTED',
                    err
                  })
              })
    })
}

export const signUp = (name,email,password) => (dispatch,getState)  => {

  const { email , name , password } = getState().events;

  let flag = 0;

  if(validator.isEmpty(name)){
    flag = 1;
    dispatch({
      type:'SIGNUP_NAME_FIELD_ERROR',
      error:'Name is Required'
    })
  }

  if(validator.isEmpty(email)){
    flag = 1;
    dispatch({
      type:'SIGNUP_EMAIL_FIELD_ERROR',
      error:'Email is Required'
    })
  }

  if(validator.isEmpty(password)){
    flag = 1;
    dispatch({
      type:'SIGNUP_PASSWORD_ERROR',
      error:'Password is Required'
    })
  }

  if(!flag){
    dispatch({
      type:'SIGNUP',
      payload:post(`${apiEndPoint}/auth/signup`,{name,email,password}).then((res) => {
        dispatch({
          type:'SIGNUP_FULFILLED',
          data:res
        })
      }).catch((err) => {
        dispatch({
          type:'SIGNUP_REJECTED',
          error:err.errors
        })
      })
    })
  }
}

export const checkValidation = () => (dispatch,getState) => {
   const { eventName , eventDescription , duration , location , fees , tags ,  participantNo} = getState().events;

  let events = {
    eventName: eventName,
    eventDescription: eventDescription,
    duration: duration,
    location:location,
    fees:fees,
    tags:tags,
    participantNo:participantNo
   }


  const token = Auth.getToken();

   console.log(Auth.getToken());

   let flag = 0;
   if( validator.isEmpty(eventName)){
      flag = 1;
      dispatch ({
        type: 'EVENTNAME_INVALID',
        error:'Event Name Can Not Be Empty'
      });
   }

   if(validator.isEmpty(duration)) {
    flag = 1;    
    dispatch ({
      type: 'EVENT_DURATION_INVALID',
      error:'Event Duration Can Not Be Empty'
    });    
  }

   if(validator.isEmpty(location)){
    flag = 1;    
    dispatch ({
      type: 'EVENT_LOCATION_INVALID',
      error:'Event Location Can not be empty'
    });
  }

  if(validator.isEmpty(fees)){
    flag = 1;    
    dispatch ({
      type: 'EVENT_FEES_INVALID',
      error:'Event Fees Can not be empty'
    });
  }

  if(validator.isEmpty(tags)) {
    flag = 1;
    dispatch({
      type:'EVENT_TAGS_INVALID',
      error:'Event Tags Can not be Empty'
    })
  }

  if(validator.isEmpty(participantNo)) {
    flag = 1;
    dispatch({
      type:'EVENT_PARTICIPATION_INVALID',
      error:'Participation Number Can not be Empty'
    })
  }

  if(validator.isEmpty(eventDescription)) {
    flag = 1;
    dispatch({
      type:'EVENT_DESCRIPTION_INVALID',
      error:'Event Description Can not be Empty'
    })
  }

  if(isNaN(duration)){
    flag = 1;
    dispatch({
      type:'EVENT_DURATION_TYPE_INVALID',
      error:'Duration Must Be A Number'
    })
  }

  if(isNaN(fees)) {
    flag = 1;
    dispatch({
      type:'EVENT_FEES_TYPE_INVALID',
      error:'Fees Must Be A Number'
    })
  }

  if(isNaN(participantNo)){
    flag = 1;
    dispatch({
      type:'EVENT_PARTICIPATION_TYPE_INVALID',
      error:'Participation Number Must Be A Number'
    })
  }




  if(!flag){

      dispatch({
        type:'OPEN_DIALOG'
      })


   
  }
}

export const closeDialog = () => (dispatch,getState) => {
    dispatch({
      type:'CLOSE_DIALOG'
    });
}


export const createEvent = () => (dispatch,getState) => {

  const { eventName , eventDescription , duration , location , fees , tags ,  participantNo} = getState().events;

  let events = {
    eventName: eventName,
    eventDescription: eventDescription,
    duration: duration,
    location:location,
    fees:fees,
    tags:tags,
    participantNo:participantNo
   }

  const token = Auth.getToken();

   dispatch({
      type:'CREATE_EVENT',
      payload: post(`${apiEndPoint}/api/create_event`, events ,{
        Authorization: `bearer ${token}`,
      }).then((res) => {
         dispatch({
           type:'CREATE_EVENT_FULFILLED',
           data:res
         })
      }).catch((err) => {
         dispatch({
           type:'CREATE_EVENT_REJECTED'
         })
      })
    })
}


export const closeSuccessModal = () => (dispatch,getState) => {
    dispatch({
      type:'CLOSE_SUCCESS_MODAL'
    })
}

export const getEvents = () => (dispatch,getState) => {

  const token = Auth.getToken();

  dispatch({
    type: 'FETCH_EVENTS',
    payload:get(`${apiEndPoint}/api/fetchEvents`,{
      Authorization: `bearer ${token}`,
    }).then((res) => {
        dispatch({
          type:'FETCH_EVENTS_FULFILLED',
          data:res.data
        })
    })
  })
}

export const closeSignupModule = () => (dispatch,getState) => {
  dispatch({
    type:'CLOSE_SIGNUP_MODULE'
  })
}

export const deleteEvent = (eventId) => (dispatch,getState) => {
  console.log('eventID =          ==>',eventId);
  const token = Auth.getToken();
  dispatch({
    type:'DELETE_EVENT',
    payload:put(`${apiEndPoint}/api/deleteEvent/`, {eventId},{
      Authorization: `bearer ${token}`
    }).then((res) => {
        dispatch({
          type: 'DELETE_EVENT_SUCCESSFULL',
          data:res.data
        })
     })
  }) 
}