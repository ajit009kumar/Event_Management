import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import {
    indigo500, // indigo400,
    redA200,
    grey100, grey200, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
  } from 'material-ui/styles/colors';
  import { fade } from 'material-ui/utils/colorManipulator';
  import EventsViewCard from '../views/EventsViewCard';
  

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


const scrollView = (id) => {
    const idDiv = document.getElementById(id);
    const xyz = idDiv.getBoundingClientRect();
    window.scrollBy(xyz.left, xyz.y - 80);
    };

const EventsView = ({
    eventName,
    description,
    fees,
    location,
    tags,
    user,
    _id,
}) => (
    <div>
  <div id={_id}>
    <Card
      style={{ marginTop: '24px', marginBottom: '24px' }}
    >
      <CardTitle
        title={eventName}
        titleColor={theme.alternateTextColor}
        subtitle={`Event Tags: #${tags}
         | Event Location: ${location} 
         | Event Fee: ${fees}`}
        subtitleColor={theme.alternateTextColor}
        actAsExpander
        showExpandableButton
        style={{
          backgroundColor: theme.primary2Color,
          paddingTop: 0,
          paddingBottom: 8,
        }}
      />
                 
      <CardText expandable>
        <EventsViewCard
    eventName={eventName}
    description={description}
    fees={fees}
    location={location}
    tags={tags}
    user={user}
    _id={_id}        
    />
      </CardText>
  </Card>
  </div>
  </div>
)

export default EventsView;