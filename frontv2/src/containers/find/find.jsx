import React, { Component } from 'react'
import Input from "../../component/input/input";
import Com from "../app/com/com";
import Button from "../../component/input/button";
import Loader from "../../component/loader/loader";
import Commantary from "../app/com/com";

class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            errorMsg: '',
            publication: '',
            find: '',
            userId: props.userId,
            token: props.token,
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

    sendCommentary(id, key) {
        let     err     = 0;
        const   input   = document.getElementById(this.state.form.com.name+key).value;
        const   regExp  = new RegExp(this.state.form.com.regExp);
        console.log(input);

        if (!regExp.test(input)){
            this.setState({loading: false, error: true, errorMsg: 'Formulaire invalide'})
            return 0;
        }

        // Initialisation des vars
        let     commentaryJ                 = {}
        const   url                         = `http://${window.location.host.replace(':3000', ':3001')}/commentary/new`;
        const   username                    = this.props.username;
        const   headers                     = {'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'}
        const   previousCom                 = JSON.parse(this.state.publication[key].commantary);
        commentaryJ['commentary']   = JSON.stringify(previousCom) === '{}' ? [{username: username, message: input}] : [...previousCom, {username: username, message: input}];
        commentaryJ['id']           = id;
        console.log(commentaryJ);

        // Requete HTTP
        fetch(url, {method: 'POST', headers: headers, body: JSON.stringify(commentaryJ)})
            .then(res => {
                if (res.ok){
                    this.setState({loading: false, success: true, successMsg: 'Commentaire envoyé'})
                } else {
                    this.setState({loadind: false, error: true, errorMsg: 'Une erreur est survenue'})
                }
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const url       = `http://${window.location.host.replace(':3000', ':3001')}/publication/getAllFrom`;
        const headers   = {'authorization': 'Baerer ' + this.state.token, 'content-type': 'application/json'}

        fetch(url, {method: 'POST', headers: headers, body: JSON.stringify({find: this.state.find})})
            .then(res => {
                if (res.ok){
                    res.json()
                        .then(json => {
                            const state = JSON.stringify(this.state.publication);
                            if(state !== JSON.stringify(json)) {
                                this.setState({loading: false, publication: json})
                            }
                        })
                }
            })
    }

    handleChange(e){
        e.preventDefault();
        this.setState({find: e.target.value});
    }

    render(){
        let publication;

        if (this.state.loading === false && this.state.error === false && this.state.publication !== '') {
            publication = this.state.publication.map((val, key) => {
                const date      = new Date(val.date_post).toLocaleDateString();
                return <div className="card center border-0 col-10 mt-3" key={key}>
                    {val.filePath ? val.filePath.indexOf('.mp4') !== -1 ?
                        <video src={val.filePath} controls>Vidéo non supporte</video> :
                        <img src={val.filePath} className="card-img-top" alt="Image"/> : null}
                    <div className="card-body bg-light shadow-sm">
                        <p className="card-text">{val.description}</p>
                        { <Commantary idPublicaiton={val.id} rank={this.props.rank} owner={val.idUser} token={this.state.token} userId={this.props.userId} username={this.props.username}/> }
                        <div>
                            <Input className={['form-control']} value={''} name={this.state.form.com.name} id={this.state.form.com.name+key} type={'text'} placeholder={'Commentaire'}/>
                            <Button validationForm={this.sendCommentary.bind(this, val.id, key)} >Envoyer</Button>
                        </div>
                        <p>Poster par {val.usernameUser} le {date}</p>
                    </div>
                </div>
            })
        }

        return<>
        <div className={'findBar'}>
            <label htmlFor={'find-input'}>Rechercher</label>
            <input type={'text'} id={'find-input'} name={'find'} className={'form-control'} placeholder={'Rechercher par utilisateur'} value={this.state.find} onChange={this.handleChange.bind(this)}/>
        </div>
            <div className={'container container-flex-col-center'}>
                {this.state.loading ? <Loader/> : publication }
            </div>
        </>
    }
}

export default Find;