import React, { Component } from 'react'
import Form                 from '../form/form'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formWanted: 'login',
            formLogin:[
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
                ],
            formRegister: [
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
            ],
        }
    }

    changeForm() {
        const form = this.state.formWanted === 'login' ? 'register' : 'login';
        this.setState({formWanted: form});
        return form;
    }

    render() {
        return <div className='container-flex-center container-flex-center-background'>
            <Form login={this.props.forLogin} validationForm={this.props.forLogin} formWanted={this.state.formWanted} changeForm={this.changeForm.bind(this)} form={this.state.formWanted === 'login' ? this.state.formLogin : this.state.formRegister }/>
        </div>
    }
}

export default Login;