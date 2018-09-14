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
import {grey100} from 'material-ui/styles/colors'
import {updateField, signUp} from '../actions/userActions'
import Auth from '../modules/Auth'

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
    const { signupSuccessfull } = previousprops;
    const { history } = this.props;
    if(signupSuccessfull){
      history.push('/');
    }
  }


  render () {
    const { name,email,password,signUp,update,signupSuccessfull }= this.props;
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
            {/* {errors.summary &&
                <p className='error-message'>{errors.summary}</p>} * */}

              <div className='field-line'>
                <TextField
                  floatingLabelText='Name'
                  name='name'
                //   errorText={userInfo ? userInfo.message : null}
                  // onChange={onChange}
                  // value={user.email}
                  onChange={(_, value) => {
                    update('name', value)
                  }}
                />
              </div>

              <div className='field-line'>
                <TextField
                  floatingLabelText='Email'
                  name='email'
                  onChange={(_, value) => {
                    update('email', value)
                  }}
                  //   errorText={errors.email}
                  //   onChange={onChange}
                  //   value={user.email}
                />
              </div>

              <div className='field-line'>
                <TextField
                  floatingLabelText='Password'
                  type='password'
                  name='password'
                  onChange={(_, value) => {
                    update('password', value)
                  }}
                  // onChange={onChange}
                  // errorText={errors.password}
                  // value={user.password}
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
