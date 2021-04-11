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

    cb(data) {
        let url         = '';
        let errorMsg    = 'Errur inconue';

        if (this.state.formWanted === 'login'){
            url         = 'http://localhost:3001/auth/login';
            errorMsg    = 'Aucun compte trouvé';
        } else {
            url         = 'http://localhost:3001/auth/register';
            errorMsg    = 'L\'email est déjà utlisé';
        }

        fetch(url, {method: 'POST', headers:{ 'content-type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(json => {
                            this.state.formWanted === 'login' ? this.props.successLogin(json) : this.setState({formWanted: 'register'})
                        })
                } else {
                    console.log(errorMsg);
                }
            })

        return true;
    }

    changeForm() {
        const form = this.state.formWanted === 'login' ? 'register' : 'login';
        this.setState({formWanted: form});
    }

    render() {
        return <div className='container-flex-center container-flex-center-background'>
            <Form className={['form-login']} callBack={this.cb.bind(this)} formWanted={this.state.formWanted} form={this.state.form[this.state.formWanted]}>
                <p onClick={this.changeForm.bind(this)}> {this.state.formWanted === 'login' ? 'Pas de compte, cliquez ici' : 'Déjà inscris, cliquez ici'}</p>
            </Form>
        </div>
    }
}

export default Login;