import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { theme }  from '../utils/theme';
import EventsViewCard from '../views/EventsViewCard';


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