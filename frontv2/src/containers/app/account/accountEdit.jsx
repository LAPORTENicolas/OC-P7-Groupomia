import React, { Component } from 'react'
import Form from "../../form/form";

class AccountEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            token: props.token,
            id: props.id,
            form: {
                login: {
                    name: 'edit',
                    title: 'Modifier mon compte',
                    url: 'http://localhost:3001/auth/edit',
                    successMessage: 'Modification enregistré',
                    form: [
                        {
                            type: 'email',
                            name: 'email',
                            value: this.props.email,
                            placeholder: 'Adresse email',
                            className: ['form-control'],
                            regExp: '^[0-9A-Za-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$',
                        },
                        {
                            type: 'text',
                            name: 'username',
                            value: this.props.username,
                            placeholder: 'Nom d\'utlisateur',
                            className: ['form-control'],
                            regExp: '^([a-zA-Z0-9&éèà]+)$',
                        },
                        {
                            type: 'password',
                            name: 'password',
                            value: '',
                            placeholder: 'Mot de passe',
                            className: ['form-control'],
                            regExp: '^([a-zA-Z0-9&éèà]+)$',
                        },
                        {
                            type: 'password',
                            name: 'passwordC',
                            value: '',
                            placeholder: 'Confirmation',
                            className: ['form-control'],
                            regExp: '^([a-zA-Z0-9&éèà]+)$',
                        }
                    ]
                },
            }
        }
    }
//  { email: "sqdfsdfds@dsfsqdf.com", username: "sdfsdfsqdf", password: "fsqdfqsdf", passwordC: "sqdfdfsd" }
    async successCB(data) {
        // Initialisation des var
        data['id']      = this.state.id;
        const sendData  = JSON.stringify(data);
        const url       = 'http://91.162.231.131:3001/auth/edit';
        const headers   = {'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'}

        // Vérification du mot de passe
        if (data.password !== data.passwordC){
            return false;
        }

        // Requete HTTP
        return await fetch(url, {method: 'POST', headers: headers, body: sendData})
            .then(res => {
                if (res.ok){
                    res.json()
                        .then(json => console.log(json))
                    return true;
                } else {
                    return res;
                }
            })
    }

    render() {
        return <div>
            <Form form={this.state.form.login} successCallBack={this.successCB.bind(this)} />
        </div>
    }
}

export default AccountEdit;