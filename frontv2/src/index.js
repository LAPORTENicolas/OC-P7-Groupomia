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

    logout() {
        if (localStorage.getItem('user')){
            localStorage.removeItem('user');
        }
        this.setState({logged: false, username: '', email: '', token: ''})
    }

    handleLogin(data){
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.setState({id: data.userId, username: data.username, email: data.email, token: data.token, logged: true});
        console.log(this.state);
    }

    render() {
        return this.state.logged ? <App logout={this.logout.bind(this)} username={this.state.username} email={this.state.email} id={this.state.id} token={this.state.token} /> : <Login login={this.handleLogin.bind(this)} />
    }
}

ReactDOM.render(
  <React.StrictMode>
    <User/>
  </React.StrictMode>,
  document.getElementById('root')
);