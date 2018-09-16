import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import Auth from '../modules/Auth'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {getEvents, deleteEvent} from '../actions/userActions'
import EventsView from '../views/EventsView'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import {updateField} from '../actions/userActions'

const style = {
  gradiantStyle: {
    background: 'linear-gradient(to right, #363795, #4CA1AF)'
  }
}

const FlexWrapper = styled.div`
display: flex;
flex-wrap: wrap;
`

const ContentWrapper = styled.div`
width: 80%;
margin: 0 auto;

& > * + * {
  margin-top: 16px;
}
`

const Wrapper = styled.div`
width: 100%;
margin: 0 auto;

/* & > * + * {
  margin-top: 24px;
} */
`
class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      secretData: undefined,
      user: undefined,
      openCard: ''
    }
  }

  componentWillMount () {
    const {getEvents} = this.props
    getEvents()
    this.setState({
      secretData: Auth.getToken(),
      userName: Auth.getUserName()
    })
  }

  onChangeExpander = id => {
    this.setState(() => ({
      openCard: id
    }))
  }

  clickNotification () {
    console.log('notification is clicked ===================================>')
  }

  render () {
    const {secretData, userName, openCard} = this.state
    const {availableEvents, deleteEvent, update} = this.props
    return (
      <Wrapper>
        <Card style={style.gradiantStyle} zDepth={0}>
          <FlexWrapper>
            <div style={{width: '70%', marginLeft: '10%'}}>
              <CardTitle
                className='container'
                title='Dashboard'
                titleStyle={{
                  fontSize: '26px',
                  color: 'white',
                  fontWeight: '500'
                }}
                subtitle='Welcome To The Event Management System'
                subtitleStyle={{color: 'white', fontWeight: '500'}}
              />
              {secretData &&
                <CardText
                  className='container'
                  style={{fontSize: '22px', color: 'white'}}
                >
                  Welcome
                  {' '}
                  <strong style={{fontSize: '22px', color: 'white'}}>
                    {userName.toUpperCase()}
                  </strong>
                </CardText>}
            </div>
            <div style={{width: '20%'}}>
              {Auth.isUserAuthenticated()
                ? <div style={{marginTop: 20}}>
                  <Badge
                    badgeContent={10}
                    secondary
                    badgeStyle={{top: 3, right: 12}}
                    style={{cursor: 'pointer', display: 'inline'}}
                    onClick={() => {
                      this.clickNotification()
                    }}
                    >
                    <NotificationsIcon />
                  </Badge>
                  <Link
                    to='/events'
                    style={{
                      fontSize: '14px',
                      color: 'white',
                      display: 'inline',
                      paddingRight: 10
                    }}
                    >
                    <u>CreateEvents</u>
                  </Link>
                  <Link
                    to='/logout'
                    style={{
                      fontSize: '14px',
                      color: 'white',
                      display: 'inline'
                    }}
                    >
                    <u>LogOut</u>
                  </Link>
                </div>
                : null}
            </div>
          </FlexWrapper>
        </Card>
        <ContentWrapper>
          {availableEvents &&
            availableEvents.map(events => (
              <EventsView
                {...events}
                openCard={openCard}
                onExpanderChange={this.onChangeExpander}
                deleteEvent={deleteEvent}
              />
            ))}
        </ContentWrapper>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => state.events

const mapDispatchToProps = dispatch => ({
  getEvents: () => {
    dispatch(getEvents())
  },
  deleteEvent: eventId => {
    dispatch(deleteEvent(eventId))
  },
  update: (field, value) => {
    dispatch(updateField(field, value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
