import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import reducers from './reducers/index';
import Auth from './modules/Auth';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import LogoutFunction from './components/LogoutFunction';
import Events from './components/Events';

const middleware = applyMiddleware(thunk,logger);
const store = createStore(reducers, middleware)


// injectTapEventPlugin();


const styles = {
  title: {
    cursor: 'pointer',
  },
};

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)


const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/dashboard',
        state: { from: props.location }
      }}/>
    ):
    (
      <Component {...props} {...rest} />
    ) 
  )}/>
)


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

// const PropsRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     <Component {...props} {...rest} />
//   )}/>
// )



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  }

  componentDidMount() {
    this.toggleAuthenticateStatus();
  }

  toggleAuthenticateStatus() {
    this.setState({ authenticated: Auth.isUserAuthenticated() })

  }


    render() {
      const { authenticated } = this.state;
      return (
        <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Router history={history}>
          <div>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PropsRoute exact path="/" component={Login} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}  /> 
            <LoggedOutRoute path="/signup" component={Signup}/>
            <Route path="/logout" component={LogoutFunction}/>
            <Route path ="/events" component = {Events} />
          </div>
          </Router>
        </MuiThemeProvider>
        </Provider>
      );
    }
}

export default App;