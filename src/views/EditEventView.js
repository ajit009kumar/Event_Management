import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import {Card, CardText, CardTitle} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import {red100, grey100, white} from 'material-ui/styles/colors'
import Auth from '../modules/Auth'
import {Link} from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import {updateField} from '../actions/userActions'

const FieldsContainer = styled.div`
    display: flex;
    align-items: center;
     justify-content: space-between;
`

const SelectWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

class EditEventView extends React.Component {
  constructor (props) {
    super(props)
    this.setState({})
  }

  render () {
    console.log(this.props.eventDetails)

    const {
      eventName,
      eventDescription,
      duration,
      location,
      fees,
      tags,
      participantNo
    } = this.props.eventDetails
    const {update} = this.props
    const {
      eventNameErrorMessage,
      eventDescriptionErrorMessage,
      durationErrorMessage,
      locationErrorMessage,
      feesErrorMessage,
      tagsErrorMessage,
      participantNoErrorMessage
    } = this.props

    return (
      <div>
        <Card
          style={{
            marginBottom: 64,
            width: '80%',
            marginLeft: '10%',
            marginTop: '5%'
          }}
        >
          <CardText>
            <TextField
              hintText='Event Name'
              floatingLabelText='Event Name'
              fullWidth
              value={eventName}
              errorText={eventNameErrorMessage}
              onChange={(_, value) => {
                update('eventName', value)
              }}
            />

            <TextField
              hintText='Few lines to descricbe about the Events'
              floatingLabelText='Events Description'
              multiLine
              rows={3}
              rowsMax={3}
              fullWidth
              value={eventDescription}
              errorText={eventDescriptionErrorMessage}
              onChange={(_, value) => {
                update('eventDescription', value)
              }}
            />

            <SelectWrapper>
              <TextField
                style={{width: '48%'}}
                hintText='Duration'
                floatingLabelText='Duration'
                fullWidth
                value={duration}
                errorText={durationErrorMessage}
                onChange={(_, value) => {
                  update('duration', value)
                }}
              />
              <TextField
                style={{width: '48%'}}
                hintText='Location'
                floatingLabelText='Location'
                fullWidth
                value={location}
                errorText={locationErrorMessage}
                onChange={(_, value) => {
                  update('location', value)
                }}
              />
            </SelectWrapper>

            <SelectWrapper>
              <TextField
                style={{width: '48%'}}
                hintText='Fees'
                floatingLabelText='Fees'
                fullWidth
                value={fees}
                errorText={feesErrorMessage}
                onChange={(_, value) => {
                  update('fees', value)
                }}
              />
              <TextField
                style={{width: '48%'}}
                hintText='Tags'
                floatingLabelText='Tags'
                fullWidth
                value={tags}
                errorText={tagsErrorMessage}
                onChange={(_, value) => {
                  update('tags', value)
                }}
              />
            </SelectWrapper>

            <TextField
              hintText='Maximum Number Of Participant'
              floatingLabelText='Maximum Number Of Participant'
              style={{width: '48%'}}
              fullWidth
              value={participantNo}
              errorText={participantNoErrorMessage}
              onChange={(_, value) => {
                update('participantNo', value)
              }}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}

//   export default EventsView;
const mapStateToProps = state => ({
  eventDetails: state.events,
  eventNameErrorMessage: state.events.eventNameErrorMessage,
  participantNoErrorMessage: state.events.participantNoErrorMessage,
  tagsErrorMessage: state.events.tagsErrorMessage,
  feesErrorMessage: state.events.feesErrorMessage,
  locationErrorMessage: state.events.locationErrorMessage,
  durationErrorMessage: state.events.durationErrorMessage,
  eventDescriptionErrorMessage: state.events.eventDescriptionErrorMessage
})

const mapDispatchToProps = dispatch => ({
  update: (field, value) => {
    dispatch(updateField(field, value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEventView)
