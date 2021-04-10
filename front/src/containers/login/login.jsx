import React, { Component } from 'react'
import Form                 from '../form/form'

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
                          value: '',
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
                    form: [
                        {
                            type: 'email',
                            name: 'email',
                            value: '',
                            placeholder: 'Adresse email',
                            className: ['form-control'],
                            regExp: '^[0-9A-Za-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$'
                        },
                        {
                            type: 'text',
                            name: 'username',
                            value: '',
                            placeholder: 'Nom d\'utilisateur',
                            className: ['form-control'],
                            regExp: '^([a-zA-Z0-9]+)$'
                        },
                        {
                            type: 'password',
                            name: 'password',
                            value: '',
                            placeholder: 'Mot de passe',
                            className: ['form-control'],
                            regExp: '^([a-zA-Z0-9-&éèà]+)$'
                        }
                    ]
                }
            },
        }
    }

    formSuccess(data) {
        if(this.state.formWanted === 'login') {
            this.props.successLogin(data);
        } else {
            this.setState({formWanted: 'login'});
        }
    }
//this.props.successLogin
    changeForm() {
        const form = this.state.formWanted === 'login' ? 'register' : 'login';
        this.setState({formWanted: form});
        return form;
    }

    render() {
        return <div className='container-flex-center container-flex-center-background'>
            <Form successLogin={this.formSuccess.bind(this)} formWanted={this.state.formWanted} changeForm={this.changeForm.bind(this)} form={this.state.form[this.state.formWanted]}/>
        </div>
    }
}

export default Login;