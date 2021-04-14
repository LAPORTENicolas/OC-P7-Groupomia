import React, { Component } from 'react';
import Form                 from './form/form';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formWanted: 'login',
            form: {
                login: {
                    name: 'login',
                    title: 'Connexion',
                    url: 'http://localhost:3001/auth/login',
                    successMessage: '',
                    form: [
                        {
                            type: 'email',
                            name: 'email',
                            value: 'email@email.com',
                            placeholder: 'Adresse email',
                            className: ['form-control'],
                            regExp: '^[0-9A-Za-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$'
                        },
                        {
                            type: 'password',
                            name: 'password',
                            value: 'password',
                            placeholder: 'Mot de passe',
                            className: ['form-control'],
                            regExp: '^([a-zA-Z0-9&éèà]+)$'
                        }
                    ]
                },
                register: {
                    name: 'register',
                    title: 'Inscription',
                    url: 'http://localhost:3001/auth/register',
                    successMessage: 'Inscription reussie',
                    form: [
                        {
                            type: 'email',
                            name: 'email',
                            value: 'email@email.com',
                            placeholder: 'Adresse email',
                            className: ['form-control'],
                            regExp: '^[0-9A-Za-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$'
                        },
                        {
                            type: 'text',
                            name: 'username',
                            value: 'username',
                            placeholder: 'Nom d\'utilisateur',
                            className: ['form-control'],
                            regExp: '^([a-zA-Z0-9]+)$'
                        },
                        {
                            type: 'password',
                            name: 'password',
                            value: 'password',
                            placeholder: 'Mot de passe',
                            className: ['form-control'],
                            regExp: '^([a-zA-Z0-9-&éèà]+)$'
                        }
                    ]
                }
            },
        }
    }

    handleChangeForm() {
        const state = this.state.formWanted === 'login' ? 'register' : 'login';
        console.log(this.state);
        this.setState({formWanted: state});
    }

    async successCB(data){
        // Initilidation des vars
        let     url         = '';
        const   headers   = {'content-type': 'application/json'};

        console.log(data);
        if (this.state.formWanted === 'login'){
            url = 'http://localhost:3001/auth/login';
        } else {
            url = 'http://localhost:3001/auth/register';
        }

        return await fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(data)})
            .then(res => {
                if (res.ok){
                    res.json()
                        .then(data => this.props.login(data))
                    return true;
                } else {
                    return res;
                }
            })
    }

    render(){
        return <Form successCallBack={this.successCB.bind(this)} form={this.state.formWanted === 'login' ? this.state.form.login : this.state.form.register}>
            <p onClick={this.handleChangeForm.bind(this)}>Changer de formulaire</p>
        </Form>
    }
}

export default Login;