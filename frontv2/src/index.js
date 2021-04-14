import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from "./containers/login/login";
import Loader from "./component/loader/loader";

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

    handleLogin(data){
        this.setState({id: data.userId, username: data.username, email: data.email, token: data.token, logged: true});
    }

    render() {
        return this.state.logged ? null : <Login login={this.handleLogin.bind(this)} />
    }
}

ReactDOM.render(
  <React.StrictMode>
    <User/>
  </React.StrictMode>,
  document.getElementById('root')
);