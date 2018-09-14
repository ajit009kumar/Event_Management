import React from 'react'
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
  white,
  darkBlack,
  fullBlack
} from 'material-ui/styles/colors'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'
import { theme } from '../utils/theme';


const ButtonContainer = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
`

const EventsViewCard = ({
  eventName,
  description,
  fees,
  location,
  tags,
  user,
  _id
}) => (
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
          label='Send Invitations'
          backgroundColor={theme.primary2Color}
          labelColor={theme.backgroundColor}
        />
      </CardActions>
    </ButtonContainer>
  </div>
)
export default EventsViewCard
