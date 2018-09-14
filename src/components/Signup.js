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
import {grey100, red900} from 'material-ui/styles/colors'
import {updateField, signUp,closeSignupModule} from '../actions/userActions'
import Auth from '../modules/Auth';
import { theme } from '../utils/theme';
import Dialog from 'material-ui/Dialog';


// import './../app.css';

const HeaderConatiner = {
  color: {
    backgroundColor: 'grey'
  }
}

class Signup extends React.Component {
  constructor (props) {
    super(props)
  }


  componentWillReceiveProps(previousprops) {
    // const { signupSuccessfull } = previousprops;
    // const { history } = this.props;
    // if(signupSuccessfull){
    //   history.push('/');
    // }
  }

  redirect() {
    const { history } = this.props;
    history.push('/');
  }


  render () {
    const { name,
            email,
            password,
            signUp,
            update,
            signupSuccessfull , nameErrorMessage , emailErrorMessage , 
            passwordErrorMessage , openSuccessSignup,closeSignupModule,
            signupRejectedErrorMessage }= this.props;

            console.log('openSuccessSignup=====================>',openSuccessSignup);


    return (
      <div>
        <div className='top-bar'>
          <div className='top-bar-left'>
            <Link to='/'>Event Management</Link>
          </div>
          <Card className='container' style={{marginTop: '5%'}}>
            <form
             onSubmit={(event) => {
                    event.preventDefault();
                    signUp(name,email,password);
                  }}
            >
              <h2 className='card-heading'>Sign Up</h2>
              {signupSuccessfull &&
                <p className='success-message'>{signupSuccessfull}</p>}
            {signupRejectedErrorMessage &&
                <p className='error-message' style = {{color:red900}} >{signupRejectedErrorMessage}</p>} 

              <div className='field-line'>
                <TextField
                  floatingLabelText='Name'
                  name='name'
                  // value = {name}
                  errorText={nameErrorMessage}
                  onChange={(_, value) => {
                    update('name', value)
                  }}
                />
              </div>

              <div className='field-line'>
                <TextField
                  floatingLabelText='Email'
                  name='email'
                  // value={email}
                  onChange={(_, value) => {
                    update('email', value)
                  }}
                    errorText={emailErrorMessage}
                 
                />
              </div>

              <div className='field-line'>
                <TextField
                  floatingLabelText='Password'
                  type='password'
                  name='password'
                  // value={password}
                  onChange={(_, value) => {
                    update('password', value)
                  }}
                  // onChange={onChange}
                  errorText={passwordErrorMessage}
                />
              </div>

              <div className='button-line'>
                <RaisedButton
                  type='submit'
                  label='Sign Up'
                  backgroundColor='#323765'
                  labelStyle={{color: grey100}}
                />
              </div>

              <CardText>
                Already have an account? <Link to={'/'}>Log In</Link>.
              </CardText>
            </form>
          </Card>

          <Dialog
            title="Success"
            titleStyle={{
              backgroundColor: theme.primary2Color,
              color: theme.alternateTextColor,
            }}
            labe
            modal={false}
            actions={
              <RaisedButton
                label="OK"
                backgroundColor={theme.buttonColor}
                style={{ marginRight: 5 }}
                labelColor={theme.primary1Color}
                onClick={() => {
                  closeSignupModule();
                  this.redirect();
                  }
                }
              />
            }
            open={openSuccessSignup}
          >
            <CardText style={{ fontSize: 20 }}>
            You have successfully Sign Up.
            </CardText>
          </Dialog>
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
    signUp:(name,email,password) => {
      dispatch(signUp(name,email,password))
    },
    closeSignupModule:() => {
      dispatch(closeSignupModule());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
