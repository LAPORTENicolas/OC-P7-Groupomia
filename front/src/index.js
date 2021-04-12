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
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      this.setState({
        logged: true,
        username: user.username,
        token: user.token,
        userId: user.userId,
      });
    }
  }

  getHeader() {
    return {'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'};
  }

   login(res) {
    res.json()
        .then(data => {
          localStorage.setItem('user', JSON.stringify(data));
          this.setState({logged: true, username: data.username, token: data.token, userId: data.userId});
        })
  }

  logout() {
    localStorage.removeItem('user');
    this.setState({userId: '', username: '', token: '', logged: false});
  }

  render() {
    return this.state.logged ?  <App getHeader={this.getHeader.bind(this)} username={this.state.username} userId={this.state.userId} logout={this.logout.bind(this)} /> : <Login successLogin={this.login.bind(this)}/>
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
