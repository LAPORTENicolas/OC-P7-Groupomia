import React, { Component } from 'react';
import Form                 from '../form/form';

class UserEdition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            email: '',
            userId: props.userId,
            token: props.token,
            delete: false,
            form: {
                edition: {
                    name: 'edite',
                    title: 'Editer mes informations',
                    url: 'http://localhost:3001/publication/new',
                    successMessage: 'Vos information on bien été mise à jour',
                    form: [
                        {
                            type: 'email',
                            name: 'email',
                            value: props.email,
                            placeholder: 'Adresse email',
                            className: ['form-control'],
                            regExp: '^[0-9A-Za-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$'
                        },
                        {
                            type: 'text',
                            name: 'username',
                            value: props.username,
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
                        },
                        {
                            type: 'password',
                            name: 'passwordConfirmation',
                            value: 'password',
                            placeholder: 'Confirmation mot de passe',
                            className: ['form-control'],
                            regExp: '^([a-zA-Z0-9-&éèà]+)$'
                        },
                    ]
                }
            }
        }
    }

    async cb(arrayData){
        const   header  = this.props.getHeader();
        console.log(arrayData);
        let     data    = {userId: this.props.userId, username: arrayData.username, email: arrayData.email, password: arrayData.password, passwordConfirmation: arrayData.passwordConfirmation};
        console.log(data);
        if (data.password === data.passwordConfirmation){
            return await fetch('http://localhost:3001/auth/edit', {method: 'POST', headers: header, body: JSON.stringify(data)})
                .then(res => res.ok)
        } else { return false; }
    }

    delete(){
        this.setState({delete: true})
    }

    render() {
        return <div>
            {this.state.delete ? <div className={'important-alert'}>
                <p>ATTENTION: Cette opération est iréverisble</p>
                <div className={'container'}>
                    <button className={'btn btn-danger'} onClick={this.props.deleteAccount}>Je veux supprimer mon compte</button>
                    <button className={'btn btn-success'} onClick={_ => this.setState({delete: false}) }>Je reste inscrit</button>
                </div>
            </div> : null}
            <Form className={['form-login']} callBack={this.cb.bind(this)} formWanted='edition' form={this.state.form.edition}/>
            <div className={'container'}>
                <p className={'alert red'} onClick={this.delete.bind(this)}>Je veux supprimer mon compte</p>
            </div>
        </div>
    }
}

export default UserEdition;