import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import Login                from "./containers/login/login";
import App                  from "./containers/app/app";
import './sass/app.css'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            username: '',
            email: '',
            token: '',
            id: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user')){
            const user = JSON.parse(localStorage.getItem('user'));
            this.setState({id: user.userId, username: user.username, email: user.email, token: user.token, logged: true});
        }
    }

    handleLogin(data){
        localStorage.setItem('user', JSON.stringify(data));
        this.setState({id: data.userId, username: data.username, email: data.email, token: data.token, logged: true});
    }

    render() {
        return this.state.logged ? <App username={this.state.username} email={this.state.email} id={this.state.id} token={this.state.token} /> : <Login login={this.handleLogin.bind(this)} />
    }
}

ReactDOM.render(
  <React.StrictMode>
    <User/>
  </React.StrictMode>,
  document.getElementById('root')
);