import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import Login                from './containers/login/login'
import App                  from './containers/header/header'
import reportWebVitals      from './reportWebVitals';
import './sass/app.sass';

class User extends Component{
  constructor(props) {
    super(props);
      this.state = {
        logged: false,
        username: '',
        token: '',
        userId: '',
      }
  }


  login(data){
    this.setState({userId: data.userId, username: data.username, token: data.token, logged: true});
    console.log(this.state);
  }

  render() {
    return this.state.logged ? <App /> : <Login successLogin={this.login.bind(this)}/>
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
