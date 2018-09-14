import React from 'react';
import { Card, CardText, CardTitle, CardHeader, CardActions } from 'material-ui/Card';
import {
    indigo500, // indigo400,
    redA200,
    grey100, grey200, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
  } from 'material-ui/styles/colors';
  import styled from 'styled-components';
  import RaisedButton from 'material-ui/RaisedButton';
  import { fade } from 'material-ui/utils/colorManipulator';

const theme = {
    primary1Color: '#323765',
    primary2Color: '#323770',
    // primary1Color: indigo500,
    // primary2Color: indigo400,
    primary3Color: grey400,
    accent1Color: redA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    secondaryTextColor: 'rgba(0,0,0,0.54)',
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: indigo500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    headerColor: grey200,
    buttonColor: '#f5f5f5',
    backgroundColor: grey100,
}

const ButtonContainer = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
`;

const EventsViewCard = ({
    eventName,
    description,
    fees,
    location,
    tags,
    user,
    _id,
}) => (
<div>
<CardTitle
  title="Event Information"
  style={{
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: 10,
    marginBottom: 10,
}}
    titleStyle={{ fontSize: 20 }}
    />
<Card
    zDepth={1}
    style={{
      width: '50%',
      marginLeft: '2.5%',
      paddingTop: '0px',
    }}
  >
    <table style={{ width: '100%', marginBottom: 16 }}>
      <tbody>
        <tr
          style={{
            backgroundColor: '#e0e0e0',
            color: 'black',
          }}
        >
          <th >Event Name</th>
          <td >{eventName}</td>
        </tr>
        <tr
         
        >
          <th>Event Fee</th>
          <td>{`₹${fees}/- Per Event`}</td>
        </tr>
        <tr
         
        >
          <th >Location </th>
          <td >{location}</td>
        </tr>
      </tbody>
    </table>
  </Card>
  <CardTitle
  title="Event Description"
  style={{
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: 10,
    marginBottom: 10,
}}
    titleStyle={{ fontSize: 20 }}
  />
    <CardText style={{paddingTop: 10}}>
    {description}
    </CardText>
    <ButtonContainer>
              <CardActions>
                <RaisedButton
                  label="Send Invitations"
                  backgroundColor={theme.primary2Color}
                  labelColor = {theme.backgroundColor}
                //   onTouchTap={() => {
                //     history.push(`/studentsInvitation/${driveIndex}/${driveId}`, ['collegeEvents', corporateName]);
                //   }}
                />
              </CardActions>
            </ButtonContainer>
</div>
)
export default EventsViewCard;