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

  render () {
    const {secretData, userName, openCard} = this.state
    const {availableEvents , deleteEvent } = this.props
    return (
      <Wrapper>
        <Card style={style.gradiantStyle} zDepth={0}>
          <FlexWrapper>
            <div style={{width: '75%', marginLeft: '10%'}}>
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
            <div style={{width: '15%'}}>
              {Auth.isUserAuthenticated()
                ? <div>
                  <Link
                    to='/events'
                    style={{fontSize: '14px', color: 'white'}}
                    >
                    <u>Create Events</u>
                  </Link>
                    &nbsp; &nbsp; &nbsp;
                  <Link
                    to='/logout'
                    style={{fontSize: '14px', color: 'white'}}
                    >
                    <u>Log out</u>
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
                deleteEvent = {deleteEvent}
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
  deleteEvent: (eventId) => {
    dispatch(deleteEvent(eventId));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
