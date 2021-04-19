import React, { Component } from 'react';
import Alert                from '../../component/alert/alert'
import Loader               from "../../component/loader/loader";
import Form from "../form/form";

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            idPublication: '',
            keyPublication: '',
            publication: '',
            publicationInfo: '',
            loading: true,
            success: false,
            successMsg: '',
            error: false,
            errorMsg: '',
            userId: props.userId,
            username: props.username,
            email: props.email,
            token: props.token,
            form: {
                publi: {
                    name: 'publication',
                    title: 'Modifier une publication',
                    successMessage: 'Publication modifié',
                    form: [
                        {
                            type: 'textarea',
                            name: 'description',
                            value: 'd',
                            placeholder: 'Nouvelle description',
                            className: ['form-control big-input'],
                            regExp: '^([a-zA-Z0-9&éèà -_ç()!$£^¨]+)$'
                        },
                        {
                            type: 'file',
                            name: 'file',
                            value: '',
                            placeholder: 'Changer de fichier image/gif',
                            className: ['form-control'],
                            regExp: ''
                        }
                    ]
                },
            }
        }
    }

    componentDidMount() {
        const url       = `http://${window.location.host.replace(':3000', ':3001')}/publication/getAll`;
        const headers   = { 'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'}
        const body      = {userId: this.state.userId}

        fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(body)})
            .then(res => {
                if (res.ok){
                    res.json()
                        .then(json => {
                            this.setState({publication: json, loading: false})
                        })
                } else {
                    this.setState({error: true, errorMsg: 'Aucune publication', loading: false})
                }
            })
    }

    handleChange(key){
        const test = this.state.form;
        test.publi.form[0].value = this.state.publication[key].description;
        this.setState({edit: true, idPublication: this.state.publication[key].id, publicationInfo: this.state.publication[key], keyPublication: key});
    }

    handleDelete(key){
        this.setState({loading: true})

        const state     = [...this.state.publication];
        const url       = `http://${window.location.host.replace(':3000', ':3001')}/publication/deleteAdmin`;
        const headers   = {'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'};
        const data      = {'userId': this.state.userId, 'id': this.state.publication[key].id}

        fetch(url, {method: 'DELETE', headers: headers, body: JSON.stringify(data)})
            .then(res => {
                if (res.ok) {
                    state.splice(key, 1);
                    this.setState({loading: false, success: true, successMsg: 'Publication supprimé', publication: state})
                } else {
                    this.setState({loading: false, error: true, errorMsg: 'Une erreur est survenue'})
                }
            })

    }

    async successCB(data){
        // Initalisation des vars
        const   url         = `http://${window.location.host.replace(':3000', ':3001')}/publication/editAdmin`;
        const   headers     = {'authorization': 'Baerer ' + this.state.token}
        const   file        = data['file'] === undefined ? undefined : data['file'];
        let     formData    = new FormData();

        // Mise en forme des données
        formData.append('id', this.state.idPublication);
        formData.append('userId', this.props.userId);
        formData.append('description', data.description);
        formData.append('lastOnlyText', this.state.publicationInfo.onlyText)
        formData.append('filePath', this.state.publicationInfo.filePath)
        formData.append('upload', file)

        // Requete HTTP
        return await fetch(url, {method: 'PUT', headers: headers, body: formData})
            .then(res => {
                if (res.ok){
                    return true
                } else {
                    return res
                }
            })
    }

    render() {
        let publication = '';

        if (this.state.loading === false && this.state.error === false && this.state.edit === false) {
            publication = this.state.publication.map((val, key) => {
                const date      = new Date(val.date_post).toLocaleDateString();
                return <div className="card center border-0 col-10 mt-3" key={key}>
                    {val.filePath ? val.filePath.indexOf('.mp4') !== -1 ?
                        <video src={val.filePath} controls>Vidéo non supporte</video> :
                        <img src={val.filePath} className="card-img-top" alt="Ilustration publication"/> : null}
                        <div className="card-body bg-light shadow-sm">
                        <p className="card-text">{val.description}</p>
                        <p>Poster par {val.usernameUser} le {date}</p>
                        <p className="btn btn-primary" onClick={ _ => this.handleChange(key)}>Modifier</p>
                        <p className="btn btn-danger" onClick={ _ => this.handleDelete(key)}>Supprimer</p>
                    </div>
                </div>
            });
        }

        if (this.state.edit){
            const previousData = this.state.publication[this.state.keyPublication];
            publication = <div className={'container'}>
                <h2>
                    { previousData.filePath === undefined ? null : previousData.filePath ? previousData.filePath.indexOf('.mp4') !== -1 ?
                            <>Vidéo actulle: <video src={previousData.filePath} controls>Vidéo non supporte</video></> :
                            <>Image actuelle: <img src={previousData.filePath} className="card-img-top" alt="Illustration publication"/></> : null }
                </h2>
                <Form form={this.state.form.publi} successCallBack={this.successCB.bind(this)}/>
            </div>
        }

        return <div className={'container container-flex-col-center'}>
            {this.state.success ? <Alert type={'success'}>{this.state.successMsg}</Alert> : null}
            {this.state.loading === true ? <div className={'mt-5'}><Loader/></div> :
                this.state.error ? <Alert type={'danger'}>{this.state.errorMsg}</Alert> : publication
            }
        </div>
    }
}

export default AdminPage;