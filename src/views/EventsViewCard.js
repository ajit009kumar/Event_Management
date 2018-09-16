import React from 'react'
import {connect} from 'react-redux'
import {
  Card,
  CardText,
  CardTitle,
  CardHeader,
  CardActions
} from 'material-ui/Card'
import {
  indigo500, // indigo400,
  redA200,
  grey100,
  grey200,
  grey300,
  grey400,
  grey500,
  red500,
  white,
  darkBlack,
  fullBlack,
  red900
} from 'material-ui/styles/colors'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'
import {theme} from '../utils/theme'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {setEventId} from '../actions/userActions'
import EditEventView from '../views/EditEventView'
import {
  updateField,
  checkValidation,
  checkEditedValue,
  openEventEditModal,
  closeSuccessModal
} from '../actions/userActions'
import validator from 'validator'

const ButtonContainer = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
`

const ContentWrapper = styled.div`width: inherit`

class EventsViewCard extends React.Component {
  constructor () {
    super()
    this.state = {
      eventId: undefined,
      openDialog: false,
      closeDialog: false,
      openSuccessModal: false
      // eventEditModal:false
    }
  }

  selectEventId = id => {
    this.setState({
      eventId: id,
      openDialog: true
    })
  }

  closeDialog = () => {
    this.setState({
      openDialog: false
    })
  }

  openEditModal = eventId => {
    const {setEventId, openEventEditModal} = this.props
    setEventId(eventId)
    openEventEditModal()
  }

  getEditStepContent = () => {
    const {
      eventName,
      description,
      fees,
      location,
      tags,
      duration,
      participantNo,
      update
    } = this.props
    return <EditEventView />
  }

  // cancelModal = () => {
  //     this.setState({
  //       eventEditModal:false
  //     })
  // }

  updateEvents = () => {
    const {
      eventId,
      duration,
      eventDescription,
      eventName,
      fees,
      location,
      participantNo,
      tags,
      eventEditModal
    } = this.props.eventDetails
    const {checkEditedValue} = this.props
    let eventDetails = {
      duration: duration,
      eventDescription: eventDescription,
      eventName: eventName,
      fees: fees,
      location: location,
      participantNo: participantNo,
      tags: tags,
      eventId: eventId
    }
    checkEditedValue(eventDetails)
    // this.setState({
    //   eventEditModal:false
    // })
  }

  render () {
    const {
      eventName,
      description,
      fees,
      location,
      tags,
      deleteEvent,
      user,
      _id,
      duration,
      participantNo
    } = this.props

    const {eventId, openDialog, closeDialog} = this.state
    const {eventEditModal, openSuccessModal} = this.props.eventDetails
    const {closeSuccessModal} = this.props

    return (
      <div>
        <CardTitle
          title='Event Information'
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            marginTop: 10,
            marginBottom: 10
          }}
          titleStyle={{fontSize: 20}}
        />

        <Card
          zDepth={1}
          style={{
            width: '50%',
            marginLeft: '2.5%',
            paddingTop: '0px'
          }}
        >
          <table style={{width: '100%', marginBottom: 16}}>
            <tbody>
              <tr
                style={{
                  backgroundColor: '#e0e0e0',
                  color: 'black'
                }}
              >
                <th>Event Name</th>
                <td>{eventName}</td>
              </tr>
              <tr>
                <th>Event Fee</th>
                <td>{`₹${fees}/- Per Event`}</td>
              </tr>
              <tr>
                <th>Location </th>
                <td>{location}</td>
              </tr>
              <tr>
                <th>ParticipantNo </th>
                <td>{participantNo}</td>
              </tr>
              <tr>
                <th>Duration </th>
                <td>{duration}</td>
              </tr>
            </tbody>
          </table>
        </Card>
        <CardTitle
          title='Event Description'
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            marginTop: 10,
            marginBottom: 10
          }}
          titleStyle={{fontSize: 20}}
        />
        <CardText style={{paddingTop: 10}}>
          {description}
        </CardText>
        <ButtonContainer>
          <CardActions>

            <RaisedButton
              label='Edit Event'
              backgroundColor={theme.primary2Color}
              labelColor={theme.backgroundColor}
              onClick={() => {
                this.openEditModal(_id)
              }}
            />

            <RaisedButton
              label='Delete Event'
              backgroundColor={red500}
              labelColor={theme.backgroundColor}
              onClick={() => {
                this.selectEventId(_id)
              }}
            />

            <RaisedButton
              label='Send Invitations'
              backgroundColor={theme.primary2Color}
              labelColor={theme.backgroundColor}
            />
          </CardActions>
        </ButtonContainer>
        <Dialog
          title='Delete Event'
          titleStyle={{
            backgroundColor: red900,
            color: theme.alternateTextColor
          }}
          actions={[
            <RaisedButton
              key='CANCEL_DELETE'
              label='Cancel'
              style={{marginLeft: 12, marginRight: 5}}
              onClick={() => {
                this.closeDialog()
              }}
            />,
            <RaisedButton
              key='EVENT'
              label='DELETE'
              backgroundColor={theme.primary2Color}
              labelColor={theme.backgroundColor}
              onClick={() => {
                deleteEvent(eventId)
                this.openModal()
              }}
            />
          ]}
          modal={false}
          open={openDialog}
          onRequestClose={closeDialog}
        >
          <CardText style={{fontSize: 20}}>
            Are you sure you want to Delete this Event ?
          </CardText>
        </Dialog>

        <Dialog
          title='Edit Event'
          titleStyle={{
            backgroundColor: theme.primary2Color,
            color: theme.alternateTextColor
          }}
          actions={[
            <RaisedButton
              label='Cancel'
              backgroundColor={theme.buttonColor}
              style={{marginRight: 5}}
              labelColor={theme.primary1Color}
              onClick={this.cancelModal}
            />,
            <RaisedButton label='Update' primary onClick={this.updateEvents} />
          ]}
          modal={false}
          open={eventEditModal}
          autoScrollBodyContent
          contentStyle={{
            width: '70%',
            maxWidth: 'none'
          }}
        >
          <ContentWrapper>
            <div>{this.getEditStepContent()}</div>
          </ContentWrapper>
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
              }}
            />
          }
          open={openSuccessModal}
        >
          <CardText style={{fontSize: 20}}>
            You have successfully Updated the Events.
          </CardText>
        </Dialog>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  eventDetails: state.events
})

const mapDispatchToProps = dispatch => ({
  setEventId: eventId => {
    dispatch(setEventId(eventId))
  },
  update: (field, value) => {
    dispatch(updateField(field, value))
  },
  checkValidation: () => {
    dispatch(checkValidation())
  },
  checkEditedValue: eventDetails => {
    dispatch(checkEditedValue(eventDetails))
  },
  openEventEditModal: () => {
    dispatch(openEventEditModal())
  },
  closeSuccessModal: () => {
    dispatch(closeSuccessModal())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsViewCard)
