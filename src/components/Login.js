'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Card, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { grey100, red900 } from 'material-ui/styles/colors';
import { updateField , loginUser } from '../actions/userActions';
import Auth from '../modules/Auth';


// import './../app.css';

const HeaderConatiner = {
  color: {
    backgroundColor: 'grey'
  }
}

class Login extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillReceiveProps(previousprops) {
    const { userInfo } = previousprops;
    const {history , toggleAuthenticateStatus } = this.props;
    if( userInfo && userInfo.token){
      Auth.authenticateUser(userInfo.token);
      toggleAuthenticateStatus();
      Auth.addUserName(userInfo.user.name);
      if(Auth.isUserAuthenticated()){
        history.push('/dashboard');
      }
      else{
        history.push('/');
      }
    }
  }


  render () {
    const { update , login ,email,password,history,invalidCredentialErrorMessage,passwordErrorMessage,emailErrorMessage }= this.props;
    return (
      <div>
        <div className='top-bar'>
          <div className='top-bar-left'>
            <Link to='/'>Event Management</Link>
          </div>
          <Card className='container' style = {{marginTop:'5%'}} >
            <form 
                onSubmit={(event) => {
                    event.preventDefault();
                    login(email,password);
                  }}
               >
              <h2 className='card-heading'>Login</h2>
{/* 
              {successMessage &&
                <p className='success-message'>{successMessage}</p>}*/}
                {invalidCredentialErrorMessage &&
                <p className='error-message' style ={{color:red900}}  >{invalidCredentialErrorMessage}</p>} 

              <div className='field-line'>
                <TextField
                  floatingLabelText='Email'
                  name='email'
                  errorText={ emailErrorMessage ? emailErrorMessage : null}
                  onChange={(_, value) => {
                        update('email', value);
                   }}
                />
              </div>

              <div className='field-line'>
                <TextField
                  floatingLabelText='Password'
                  type='password'
                  name='password'
                  onChange={(_, value) => {
                      update('password', value);
                   }}
                  errorText={passwordErrorMessage ? passwordErrorMessage: undefined}
                />
              </div>

              <div className='button-line'>
                <RaisedButton type='submit' label='Log in' backgroundColor = "#323765"
                 labelStyle ={{color:grey100}}/>
              </div>

              <CardText>
                Don't have an account? <Link to={'/signup'} >Create one</Link>.
              </CardText>
            </form>
          </Card>

        </div>
      </div>
    )
  }
}


const mapStateToProps = state => state.events;

const mapDispatchToProps = dispatch => ({
  update: (field, value) => {
    dispatch(updateField(field, value));
  },
  login: (email,password) => {
    dispatch(loginUser(email,password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
