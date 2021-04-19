import React, { Component } from 'react'
import Form from "../../form/form";
import Loader from "../../../component/loader/loader";

class AccountEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            token: props.token,
            id: props.id,
            popUp: false,
            loading: false,
            form: {
                login: {
                    name: 'edit',
                    title: 'Modifier mon compte',
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

    async successCB(data) {
        // Initialisation des var
        data['id']      = this.state.id;
        const sendData  = JSON.stringify(data);
        const url       = `http://${window.location.host.replace(':3000', ':3001')}/auth/edit`;
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
                        .then(_ => this.props.refreshUser(data))
                    return true;
                } else {
                    return res;
                }
            })
    }

    handleClick() {
        const popUp = !this.state.popUp;
        this.setState({popUp: popUp});
    }

    handleClickDelete() {
        this.setState({loading: true})
        this.props.deleteAccount();
    }

    render() {
        return <div>
            {this.state.popUp ? null : null}
            <div className={this.state.popUp ? 'pop-up-delete' : 'hidden'}>
                { this.state.loading ? <h2>Compte en cours de suppression</h2> :
                    <>
                    <h2>Êtes vous sur de vouloir supprimer votre compte ? Cette action est iréversible</h2>
                    <div>
                    <button className={'btn btn-danger'} onClick={this.handleClickDelete.bind(this)}>Supprimer mon compte</button>
                    <button className={'btn btn-success'} onClick={this.handleClick.bind(this)}>Ne pas supprimer mon compte</button>
                    </div>
                    </>
                }
            </div>
            <Form form={this.state.form.login} successCallBack={this.successCB.bind(this)}>
                <button className={'btn btn-danger mt-5 '} onClick={this.handleClick.bind(this)}>Supprimer mon compte</button>
            </Form>
        </div>
    }
}

export default AccountEdit;