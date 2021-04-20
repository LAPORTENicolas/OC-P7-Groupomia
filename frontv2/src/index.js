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
            rank: 0,
            username: '',
            email: '',
            token: '',
            id: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user')){
            const user = JSON.parse(localStorage.getItem('user'));
            this.setState({id: user.userId, username: user.username, email: user.email, token: user.token, logged: true, rank: 1});
        }
    }

    logout() {
        if (localStorage.getItem('user')){
            localStorage.removeItem('user');
        }
        this.setState({logged: false, username: '', email: '', token: '', rank: 0})
    }

    handleLogin(data){
        localStorage.setItem('user', JSON.stringify(data));
        this.setState({id: data.userId, username: data.username, email: data.email, token: data.token, logged: true, rank: data.admin});
    }

    refreshUser(data){
        this.setState({username: data.username, email: data.email})
    }

    async deleteAccount() {
        const data      = {userId: this.state.id};
        const url       = 'http://localhost:3001/auth/delete';
        const headers   = {'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'}

        return await fetch(url, {method: 'DELETE', headers: headers, body: JSON.stringify(data)})
            .then(res => {
                if (res.ok){
                    this.setState({logged: false, rank: 0, username: '', email: '', token: '', id: ''});
                } else {
                    res.json()
                        .then(json => console.log(json));
                }
            })
    }

    render() {
        return this.state.logged ? <App refreshUser={this.refreshUser.bind(this)} deleteAccount={this.deleteAccount.bind(this)} rank={this.state.rank} logout={this.logout.bind(this)} username={this.state.username} email={this.state.email} id={this.state.id} token={this.state.token} /> : <Login login={this.handleLogin.bind(this)} />
    }
}

ReactDOM.render(
  <React.StrictMode>
    <User/>
  </React.StrictMode>,
  document.getElementById('root')
);