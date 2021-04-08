import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import Login                from './containers/login/login'
import reportWebVitals      from './reportWebVitals';
import './sass/app.sass';

class User extends Component{
  constructor(props) {
    super(props);
    if (sessionStorage.getItem('user')) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      this.state = {
        logged: true,
        token: user.token,
        userId: user.userId,
      }
    } else {
      this.state = {
        logged: false,
        token: '',
        userId: '',
      }
    }
  }


  login() {
    let user  = sessionStorage.getItem('user');
    user = JSON.parse(user);
    this.setState({token: user.token, userId: user.userId, logged: true});
  }

  render() {
    return this.state.logged ? null : <Login forLogin={this.login.bind(this)}/>
  }

}

ReactDOM.render(
  <React.StrictMode>
    <User/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
