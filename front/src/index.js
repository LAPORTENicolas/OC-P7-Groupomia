import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import Login                from './containers/login/login'
import App                  from './containers/app'
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

  componentDidMount() {
    if (localStorage.getItem('user')) {
      const user = localStorage.getItem('user')
      this.setState({
        logged: true,
        username: user.username,
        token: user.token,
        userId: user.userId,
      });
    }
  }

  login(data) {
    this.setState({userId: data.userId, username: data.username, token: data.token, logged: true});
  }

  logout() {
    localStorage.removeItem('user');
    this.setState({userId: '', username: '', token: '', logged: false});
  }

  render() {
    return this.state.logged ? <App logout={this.logout.bind(this)} /> : <Login successLogin={this.login.bind(this)}/>
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
