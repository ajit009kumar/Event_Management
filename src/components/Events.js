import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import {Card, CardText, CardTitle} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import {red100, grey100} from 'material-ui/styles/colors'
import Auth from '../modules/Auth'
import {Link} from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import EventsView from './EventsView'
import Subheader from 'material-ui/Subheader'
import {
  checkValidation,
  closeDialog,
  createEvent,
  closeSuccessModal
} from '../actions/userActions'
// import { theme } from '../utils/theme';

const ContentWrapper = styled.div`
width: 90%;
margin: 0 auto;
background-color: ${props => props.theme.backgroundColor};

& > * + * {
  margin-top: 16px;
}
`

const ButtonContainer = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
`

const theme = {
  primary1Color: 'white',
  buttonColor: '#323770',
  primary2Color: '#323770',
  alternateTextColor: 'white'
}

class Events extends React.Component {
  constructor (props) {
    super(props)
  }

  getdriveStepContent () {
    return <EventsView />
  }

  handlePrev () {
    window.history.back()
  }

  redirect () {
    const {history} = this.props
    console.log(history)
    history.push('/dashboard')
  }

  //  createEvents(){
  //    const  { createEvent , closeDialog } = this.props;
  //    createEvent();
  //    closeDialog();
  //  }

  render () {
    const {
      checkValidation,
      openDialog,
      closeDialog,
      createEvent,
      openSuccessModal,
      closeSuccessModal,
      history
    } = this.props
    return (
      <div>
        <Card
          style={{
            position: 'relative',
            backgroundColor: grey100
          }}
          zDepth={0}
        >
          <CardTitle
            title='Create Event'
            style={{
              backgroundColor: '#323770',
              paddingLeft: '40%'
            }}
            titleColor='white'
          />
          <ContentWrapper>
            <div style={{marginBottom: 15, marginTop: 20}}>
              <ButtonContainer>
                <RaisedButton
                  label='Back'
                  onClick={() => {
                    this.handlePrev()
                  }}
                  //   disabled={stepIndex === 0}
                  backgroundColor={theme.buttonColor}
                  style={{marginLeft: 12, marginRight: 5}}
                  labelColor={theme.primary1Color}
                />
                <RaisedButton
                  label='Create Events'
                  primary
                  onClick={() => {
                    checkValidation()
                  }}
                />
              </ButtonContainer>
            </div>
            <div>{this.getdriveStepContent()}</div>
          </ContentWrapper>
          )
          <Dialog
            title='Create Event'
            titleStyle={{
              backgroundColor: theme.primary2Color,
              color: theme.alternateTextColor
            }}
            actions={[
              <RaisedButton
                key='DRIVE_CANCEL'
                label='Cancel'
                // backgroundColor={theme.buttonColor}
                style={{marginLeft: 12, marginRight: 5}}
                // labelColor={theme.primary1Color}
                onClick={() => {
                  closeDialog()
                }}
              />,
              <RaisedButton
                key='DRIVE_CREATE'
                label='Create'
                primary
                onClick={() => {
                  createEvent()
                }}
              />
            ]}
            modal={false}
            open={openDialog}
            onRequestClose={closeDialog}
          >
            <CardText style={{fontSize: 20}}>
              Are you sure you want to create the Event ?
            </CardText>
          </Dialog>
          <Dialog
            title='Success'
            titleStyle={{
              backgroundColor: theme.primary2Color,
              color: theme.alternateTextColor
            }}
            labe
            modal={false}
            actions={
              <RaisedButton
                label='OK'
                backgroundColor={theme.buttonColor}
                style={{marginRight: 5}}
                labelColor={theme.primary1Color}
                onClick={() => {
                  closeSuccessModal()
                  this.redirect()
                }}
              />
            }
            open={openSuccessModal}
          >
            <CardText style={{fontSize: 20}}>
              You have successfully created the Events.
            </CardText>
          </Dialog>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => state.events

const mapDispatchToProps = dispatch => ({
  checkValidation: () => {
    dispatch(checkValidation())
  },
  closeDialog: () => {
    dispatch(closeDialog())
  },
  createEvent: () => {
    dispatch(createEvent())
  },
  closeSuccessModal: () => {
    dispatch(closeSuccessModal())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Events)
