import React, { Component, useState } from 'react'
import Alert from "../../../component/alert/alert";
import Loader from "../../../component/loader/loader";
import Input from "../../../component/input/input";
import Button from "../../../component/input/button";

class Commantary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank: props.rank,
            idPublication: props.idPublicaiton,
            idOwnerPublication: props.owner,
            hidden: true,
            commantary: '',
            loading: true,
            successCom: false,
            successMessageCom: '',
            successDeleteCom: false,
            form: {
                com: {
                    name: 'com',
                    title: 'Commenter',
                    form: [
                        {
                            type: 'text',
                            name: 'commentaire',
                            value: '',
                            placeholder: 'Commentaire',
                            className: ['form-control big-input'],
                            regExp: '^([a-zA-Z0-9&éèà -_ç()!$,£^¨]+)$'
                        }
                    ]
                },
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const url       = `http://${window.location.host.replace(':3000', ':3001')}/commentary/getAll/` + this.state.idPublication;
        const headers   = {'authorization': 'Bearer ' + this.props.token};

        fetch(url, {method: 'GET', headers: headers})
            .then(res => {
                if (res.ok){
                    res.json()
                        .then(json => {
                           if (JSON.stringify(json) !== JSON.stringify(this.state.commantary)){
                               this.setState({commantary: json});
                           }
                        });
                }
            })
    }

    componentDidMount() {
        const url       = `http://${window.location.host.replace(':3000', ':3001')}/commentary/getAll/` + this.state.idPublication;
        const headers   = {'authorization': 'Baerer ' + this.props.token}

        fetch(url, {method: 'GET', headers: headers})
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(json => this.setState({commantary: json, loading: false}))
                        .catch(err => console.log(err));
                }
            })
    }

    onChange() {
        const state = !this.state.hidden;
        this.setState({hidden: state});
    }

    sendCommentary() {
        this.setState({loadingCom: true, successDeleteCom: false, successCom: false})

        let     err     = 0;
        const   input   = document.getElementById(this.state.form.com.name+this.state.idPublication).value;
        const   regExp  = new RegExp(this.state.form.com.regExp);

        if (regExp.test(input) && input.length >= 1 && input.length <= 200){
        } else {
            this.setState({loadingCom: false, error: true, errorMsg: 'Formulaire invalide'})
            return 0;
        }

        // Initialisation des vars
        const   url         = `http://${window.location.host.replace(':3000', ':3001')}/commentary/new`;
        const   username    = this.props.username;
        const   userId      = this.props.userId;
        const   idOwner     = this.props.owner;
        const   headers     = {'authorization': 'Baerer ' + this.props.token, 'content-type': 'application/json'}
        const   data        = {message: input, username: username, userId: userId, publicationId: this.state.idPublication, owner: idOwner}


        // Requete HTTP
        fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(data)})
            .then(res => {
                if (res.ok){
                    this.setState({loadingCom: false, successCom: true, successMessageCom: 'Commentaire envoyé'})
                } else {
                    this.setState({loadindCom: false, error: true, errorMsg: 'Une erreur est survenue'})
                }
            })

    }

    onClick(val){
        this.setState({successDeleteCom: false, successCom: false})

        const userId            = this.props.userId;
        const idPublication     = val.idPublication;
        const commentId         = val.id;
        const url               = `http://${window.location.host.replace(':3000', ':3001')}/commentary/delete`;
        const headers           = {'authorization': 'Baerer ' + this.props.token, 'content-type': 'application/json'}
        const data              = {idPublication: idPublication, userId: userId, commentId: commentId}

        fetch(url, {method: 'DELETE', headers: headers, body: JSON.stringify(data)})
            .then(res => {
                if (res.ok){
                    this.setState({successDeleteCom: true});
                }
            })
    }

    onClickAdmin(val){
        this.setState({successDeleteCom: false, successCom: false})

        const userId            = this.props.userId;
        const idPublication     = val.idPublication;
        const commentId         = val.id;
        const url               = `http://${window.location.host.replace(':3000', ':3001')}/commentary/deleteAdmin`;
        const headers           = {'authorization': 'Baerer ' + this.props.token, 'content-type': 'application/json'}
        const data              = {idPublication: idPublication, userId: userId, commentId: commentId}

        fetch(url, {method: 'DELETE', headers: headers, body: JSON.stringify(data)})
            .then(res => {
                if (res.ok){
                    this.setState({successDeleteCom: true});
                }
            })
    }

    render() {
        let commantary  = '';
        let headerCom   = '';
        if (this.state.loading === false) {
            commantary = this.state.commantary.map((val, key) => {
                if (this.state.rank === 1){
                    headerCom = <span className={'title-com'}><span>Poster par: <strong>{val.username}</strong></span><i onClick={this.onClickAdmin.bind(this, val)} className="fas fa-trash-alt pointer" /></span>
                } else if (this.props.userId === val.userId) {
                    headerCom = <span className={'title-com'}><span>Poster par: <strong>{val.username}</strong></span><i onClick={this.onClick.bind(this, val)} className="fas fa-trash-alt pointer" /></span>
                } else {
                    headerCom = <span>Poster par: <strong>{val.username}</strong></span>
                }
                return <div ref={key}
                    className={this.state.hidden ? 'container container-com hidden' : 'container container-com'}>
                    <div className={'com'}>
                        {headerCom}
                        <p>{val.message}</p>
                    </div>
                </div>
            })
        }
        return <div className={'container-com'}>
            {this.state.successDeleteCom ? <Alert type={'success'}>Commentaire supprimé</Alert> : null }
            {commantary}
            <p className={'link pointer'} onClick={this.onChange.bind(this)}>{this.state.hidden ? 'Afficher les commentaire' : 'Masquer les commentaire'}</p>
            <div className={'form-publication'}>
                { this.state.successCom ? <Alert type={'success'}>{this.state.successMessageCom}</Alert> : null}
                {this.state.error ? <Alert type={'danger'}>Commentaire invalide</Alert> : null }
                { this.state.loadingCom ? <Loader/> : <>
                    <Input className={['form-control']} value={''} name={this.state.form.com.name} id={this.state.form.com.name+this.state.idPublication} type={'text'} placeholder={'Commentaire'} />
                    <Button validationForm={this.sendCommentary.bind(this)}>Envoyer</Button></> }
            </div>
        </div>
    }
}

/*
const com = props => {
    const [value, setState] = useState('hidden');
    const onChange          = _ => {
        value === 'hidden' ? setState('visible') : setState('hidden')
    }

    const com = props.com.map((val, key) => {
        return <><div className={value === 'hidden' ? 'container container-com hidden' : 'container container-com'} key={key}>
                <div className={'com'}>
                    <span>Poster par: <strong>{val.username}</strong></span>
                    <p>{val.message}</p>
                </div>
        </div>
        </>
    })
    return <div>
        {com}
        <p onClick={onChange}>{value === 'hidden' ? 'Afficher les commentaire' : 'Masquer les commentaire'}</p>
    </div>
}
*/
export default Commantary;

/*
<div className={'container container-com'}>
    <div className={'container-com'}>
        <div className={'com'}>
            <span>Poster par: <strong>Username</strong></span>
            <p>fjkhdfsdqjkfh sfjksqdhf jkqsdfhsqdjkfh sdqjkfqhsdfjklsdh fjklsdqfhsdfh sdqkjl fhsqdjklfhsqdkljfh dsjkflhsdq fkjsdqhfjsqdk fsjdkqfh ds jkf hqsdfjkqsdh fjklqsdfdsqjkfh dsqjkfhqs djfkqsdhfjk sdhf jqskdhfjqsd</p>
        </div>
    </div>
</div>
 */